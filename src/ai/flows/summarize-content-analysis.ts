'use server';
/**
 * @fileOverview This file defines a Genkit flow for summarizing content analysis of an influencer's posts.
 *
 * - summarizeContentAnalysis - A function that takes content analysis data as input and returns a summary.
 * - SummarizeContentAnalysisInput - The input type for the summarizeContentAnalysis function.
 * - SummarizeContentAnalysisOutput - The return type for the summarizeContentAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeContentAnalysisInputSchema = z.object({
  contentAnalysis: z.string().describe('The content analysis data of an influencer, including engagement patterns, recurring themes, and audience sentiment.'),
});
export type SummarizeContentAnalysisInput = z.infer<typeof SummarizeContentAnalysisInputSchema>;

const SummarizeContentAnalysisOutputSchema = z.object({
  summary: z.string().describe('A summary of the content analysis, highlighting key insights and potential collaboration opportunities.'),
});
export type SummarizeContentAnalysisOutput = z.infer<typeof SummarizeContentAnalysisOutputSchema>;

export async function summarizeContentAnalysis(input: SummarizeContentAnalysisInput): Promise<SummarizeContentAnalysisOutput> {
  return summarizeContentAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeContentAnalysisPrompt',
  input: {schema: SummarizeContentAnalysisInputSchema},
  output: {schema: SummarizeContentAnalysisOutputSchema},
  prompt: `You are an expert in influencer marketing. You will analyze the provided content analysis data and generate a concise summary of key insights, including engagement patterns, recurring themes, and audience sentiment. This summary will be used to make informed decisions about potential collaborations with the influencer.\n\nContent Analysis:\n{{{contentAnalysis}}}`, 
});

const summarizeContentAnalysisFlow = ai.defineFlow(
  {
    name: 'summarizeContentAnalysisFlow',
    inputSchema: SummarizeContentAnalysisInputSchema,
    outputSchema: SummarizeContentAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
