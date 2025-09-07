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

// Appointment Form Action
const appointmentSchema = z.object({
    fullName: z.string().min(1, "Full name is required."),
    email: z.string().email("Invalid email address."),
    phone: z.string().min(1, "Phone number is required."),
    preferredArtist: z.string().optional(),
    tattooStyle: z.string().optional(),
    tattooDescription: z.string().min(1, "Tattoo description is required."),
    budgetRange: z.string().optional(),
    preferredTimeframe: z.string().optional(),
});

export type AppointmentFormState = {
    message: string;
    status: "success" | "error" | "idle";
    fieldErrors?: Record<string, string[] | undefined>;
};

export async function appointmentAction(
    prevState: AppointmentFormState,
    formData: FormData
): Promise<AppointmentFormState> {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = appointmentSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            message: "Please fix the errors in the form.",
            status: "error",
            fieldErrors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        await saveAppointmentRequest(validatedFields.data);
        return {
            message: "Thank you! Your appointment request has been submitted successfully.",
            status: "success",
        };
    } catch (error) {
        console.error("Failed to save appointment request:", error);
        return {
            message: "Something went wrong on the server. Please try again later.",
            status: "error",
        };
    }
}
