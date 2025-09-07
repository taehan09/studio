// src/app/actions.ts
"use server";

import { z } from "zod";
import { categorizeTattooDesign, type CategorizeTattooDesignInput } from "@/ai/flows/categorize-tattoo-designs";
import { saveAppointmentRequest } from "@/lib/firebase";

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

// Appointment Request Action
const appointmentSchema = z.object({
  fullName: z.string().min(1, "Full name is required."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(1, "Phone number is required."),
  tattooDescription: z.string().min(1, "Tattoo description is required."),
  preferredArtist: z.string().optional(),
  tattooStyle: z.string().optional(),
  budgetRange: z.string().optional(),
  preferredTimeframe: z.string().optional(),
});

export type AppointmentFormState = {
    message: string;
    error: boolean;
};

export async function appointmentAction(
    prevState: AppointmentFormState,
    formData: FormData
): Promise<AppointmentFormState> {
    const validatedFields = appointmentSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            message: validatedFields.error.flatten().fieldErrors[Object.keys(validatedFields.error.flatten().fieldErrors)[0]][0] || 'Invalid data submitted.',
            error: true,
        };
    }

    try {
        await saveAppointmentRequest(validatedFields.data);
        return {
            message: "Thank you! Your appointment request has been submitted successfully.",
            error: false,
        };
    } catch (error) {
        console.error("Failed to save appointment request:", error);
        return {
            message: "Failed to send message. Please try again later.",
            error: true,
        };
    }
}
