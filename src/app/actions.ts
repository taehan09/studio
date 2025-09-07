// src/app/actions.ts
"use server";

import { z } from "zod";
import { categorizeTattooDesign, type CategorizeTattooDesignInput } from "@/ai/flows/categorize-tattoo-designs";
import { db } from "@/lib/firebase";
import { ref, push, set } from "firebase/database";

const appointmentSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  preferredArtist: z.string(),
  tattooStyle: z.string(),
  placement: z.string().min(3, { message: "Placement must be at least 3 characters." }),
  approximateSize: z.string(),
  tattooDescription: z.string().min(10, { message: "Description must be at least 10 characters." }),
  budgetRange: z.string(),
  preferredTimeframe: z.string(),
});

export type AppointmentFormState = {
  message: string;
  errors?: {
    fullName?: string[];
    email?: string[];
    phone?: string[];
    placement?: string[];
    tattooDescription?: string[];
  };
};

export async function appointmentAction(
  prevState: AppointmentFormState,
  formData: FormData
): Promise<AppointmentFormState> {
  const validatedFields = appointmentSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    preferredArtist: formData.get("preferredArtist"),
    tattooStyle: formData.get("tattooStyle"),
    placement: formData.get("placement"),
    approximateSize: formData.get("approximateSize"),
    tattooDescription: formData.get("tattooDescription"),
    budgetRange: formData.get("budgetRange"),
    preferredTimeframe: formData.get("preferredTimeframe"),
  });

  if (!validatedFields.success) {
    return {
      message: "Failed to send message. Please check your inputs.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const requestsRef = ref(db, "site_content/appointment_requests");
    const newRequestRef = push(requestsRef);
    await set(newRequestRef, {
        ...validatedFields.data,
        submittedAt: new Date().toISOString(),
        id: newRequestRef.key,
    });
  } catch (error) {
    console.error("Failed to save appointment request:", error);
    return {
        message: "An unexpected error occurred. Please try again later."
    }
  }


  return { message: "Success! Your appointment request has been sent. We will get back to you shortly." };
}

// Tattoo Categorization Action
const tattooSchema = z.object({
  photoDataUri: z.string().refine(
    (val) => val.startsWith('data:image/'),
    { message: 'Invalid image data URI' }
  ),
});

export type CategorizationState = {
  styleCategory: string;
  error: string;
}

export async function categorizeTattooDesignAction(
  prevState: CategorizationState,
  formData: FormData
): Promise<CategorizationState> {
  const validatedFields = tattooSchema.safeParse({
    photoDataUri: formData.get("photoDataUri"),
  });

  if (!validatedFields.success) {
    return {
        styleCategory: "",
        error: validatedFields.error.flatten().fieldErrors.photoDataUri?.[0] || 'Invalid data submitted.'
    }
  }
  
  try {
    const input: CategorizeTattooDesignInput = validatedFields.data;
    const result = await categorizeTattooDesign(input);
    return { styleCategory: result.styleCategory, error: "" };
  } catch (error) {
    console.error("AI categorization failed:", error);
    return {
      styleCategory: "",
      error: "Failed to categorize the design. Please try again.",
    };
  }
}
