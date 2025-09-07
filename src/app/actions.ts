// src/app/actions.ts
"use server";

import { z } from "zod";
import { categorizeTattooDesign, type CategorizeTattooDesignInput } from "@/ai/flows/categorize-tattoo-designs";

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
