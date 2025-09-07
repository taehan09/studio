// src/ai/flows/summarize-appointment-request.ts
'use server';
/**
 * @fileOverview A Genkit flow to summarize a tattoo appointment request.
 *
 * - summarizeAppointmentRequest - A function that takes appointment details and returns a concise summary.
 * - SummarizeAppointmentRequestInput - The input type for the function.
 * - SummarizeAppointmentRequestOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeAppointmentRequestInputSchema = z.object({
    fullName: z.string(),
    email: z.string(),
    phone: z.string(),
    preferredArtist: z.string(),
    tattooStyle: z.string(),
    tattooDescription: z.string(),
    budgetRange: z.string(),
    preferredTimeframe: z.string(),
});
export type SummarizeAppointmentRequestInput = z.infer<typeof SummarizeAppointmentRequestInputSchema>;

const SummarizeAppointmentRequestOutputSchema = z.object({
  summary: z.string().describe('A concise, one-sentence summary of the tattoo request for an admin to review quickly.'),
});
export type SummarizeAppointmentRequestOutput = z.infer<typeof SummarizeAppointmentRequestOutputSchema>;

export async function summarizeAppointmentRequest(
  input: SummarizeAppointmentRequestInput
): Promise<SummarizeAppointmentRequestOutput> {
  return summarizeRequestFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeAppointmentRequestPrompt',
  input: {schema: SummarizeAppointmentRequestInputSchema},
  output: {schema: SummarizeAppointmentRequestOutputSchema},
  prompt: `You are an expert assistant for a tattoo studio admin. Your job is to summarize a new appointment request into a single, easy-to-read sentence.

Focus on the most important details: what the tattoo is, and its style.

Here is the request data:
- Name: {{{fullName}}}
- Style: {{{tattooStyle}}}
- Description: {{{tattooDescription}}}
- Preferred Artist: {{{preferredArtist}}}
- Budget: {{{budgetRange}}}
- Timeframe: {{{preferredTimeframe}}}

Generate a summary sentence. Example: "Client wants a black and grey realism tiger tattoo."
`,
});

const summarizeRequestFlow = ai.defineFlow(
  {
    name: 'summarizeRequestFlow',
    inputSchema: SummarizeAppointmentRequestInputSchema,
    outputSchema: SummarizeAppointmentRequestOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
