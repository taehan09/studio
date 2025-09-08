// src/ai/flows/generate-tattoo-idea.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating tattoo ideas based on user input.
 *
 * - generateTattooIdea - A function that takes a user's prompt and generates a tattoo concept.
 * - GenerateTattooIdeaInput - The input type for the generateTattooIdea function.
 * - GenerateTattooIdeaOutput - The return type for the generateTattooIdea function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const GenerateTattooIdeaInputSchema = z.object({
  prompt: z.string().min(10, "Please provide a more detailed description for your tattoo idea."),
});
export type GenerateTattooIdeaInput = z.infer<typeof GenerateTattooIdeaInputSchema>;

export const GenerateTattooIdeaOutputSchema = z.object({
  creativeDescription: z.string().describe("A creative and detailed description of the tattoo design, written in an inspiring and visual tone. It should be 2-3 sentences long."),
  recommendedStyle: z.string().describe("The single most fitting tattoo style for this design (e.g., Traditional, Realism, Blackwork)."),
  recommendedArtist: z.string().describe("The name of the artist from the provided list who is the best fit for this style. Choose from: TK_ASHGRAYINK, OLIVIA, NOAH, EMMA."),
});
export type GenerateTattooIdeaOutput = z.infer<typeof GenerateTattooIdeaOutputSchema>;

export async function generateTattooIdea(
  input: GenerateTattooIdeaInput
): Promise<GenerateTattooIdeaOutput> {
  return generateTattooIdeaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTattooIdeaPrompt',
  input: {schema: GenerateTattooIdeaInputSchema},
  output: {schema: GenerateTattooIdeaOutputSchema},
  prompt: `You are an expert tattoo studio concierge. A potential client is asking for a tattoo idea.
  Your task is to take their initial prompt and transform it into a more creative and concrete tattoo concept.

  You must also recommend the best tattoo style and the most suitable artist for the job based on their specialties.

  Here are the available artists and their specialties:
  - TK_ASHGRAYINK: Specializes in Traditional & Neo-Traditional tattoos.
  - OLIVIA: Specializes in Fine-line, Realism, and Watercolor tattoos.
  - NOAH: Specializes in Geometric, Blackwork, and Tribal tattoos.
  - EMMA: Specializes in Watercolor, New School, and Japanese tattoos.

  Analyze the user's prompt below and generate a response in the specified output format.
  Be creative and inspiring with your description. Make the client excited about their new tattoo!

  Client's Idea: {{{prompt}}}
  `,
});

const generateTattooIdeaFlow = ai.defineFlow(
  {
    name: 'generateTattooIdeaFlow',
    inputSchema: GenerateTattooIdeaInputSchema,
    outputSchema: GenerateTattooIdeaOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
