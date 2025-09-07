// src/ai/flows/categorize-tattoo-designs.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for categorizing tattoo designs by style using AI.
 *
 * - categorizeTattooDesign - A function that takes a tattoo image and returns its style category.
 * - CategorizeTattooDesignInput - The input type for the categorizeTattooDesign function.
 * - CategorizeTattooDesignOutput - The return type for the categorizeTattooDesign function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeTattooDesignInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a tattoo design, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type CategorizeTattooDesignInput = z.infer<typeof CategorizeTattooDesignInputSchema>;

const CategorizeTattooDesignOutputSchema = z.object({
  styleCategory: z
    .string()
    .describe(
      'The style category of the tattoo design (e.g., traditional, minimalist, watercolor).'
    ),
});
export type CategorizeTattooDesignOutput = z.infer<typeof CategorizeTattooDesignOutputSchema>;

export async function categorizeTattooDesign(
  input: CategorizeTattooDesignInput
): Promise<CategorizeTattooDesignOutput> {
  return categorizeTattooDesignFlow(input);
}

const prompt = ai.definePrompt({
  name: 'categorizeTattooDesignPrompt',
  input: {schema: CategorizeTattooDesignInputSchema},
  output: {schema: CategorizeTattooDesignOutputSchema},
  prompt: `You are an expert tattoo style categorizer.

  Analyze the provided tattoo design image and determine its style category. Provide only the most relevant style category.
  Examples of tattoo styles include: Traditional, Minimalist, Watercolor, Geometric, Tribal, Realism, Abstract, Neo-Traditional, Japanese, Blackwork.

  Here is the tattoo design:
  {{media url=photoDataUri}}

  Respond with only the style category.
  `,
});

const categorizeTattooDesignFlow = ai.defineFlow(
  {
    name: 'categorizeTattooDesignFlow',
    inputSchema: CategorizeTattooDesignInputSchema,
    outputSchema: CategorizeTattooDesignOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
