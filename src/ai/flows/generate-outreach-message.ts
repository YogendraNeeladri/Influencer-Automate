// This is a server-side file.
'use server';

/**
 * @fileOverview Generates personalized outreach messages to influencers based on their profile data and content analysis.
 *
 * - generateOutreachMessage - A function that generates personalized outreach messages.
 * - GenerateOutreachMessageInput - The input type for the generateOutreachMessage function.
 * - GenerateOutreachMessageOutput - The return type for the generateOutreachMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateOutreachMessageInputSchema = z.object({
  influencerName: z.string().describe('The name of the influencer.'),
  influencerProfileData: z.string().describe('Profile data of the influencer (e.g., bio, follower count).'),
  contentAnalysisSummary: z.string().describe('A summary of the influencer\'s content analysis, including engagement patterns, recurring themes, and audience sentiment.'),
  brandName: z.string().describe('The name of the brand reaching out.'),
  campaignDetails: z.string().describe('Details about the campaign, including goals and key message.'),
});
export type GenerateOutreachMessageInput = z.infer<typeof GenerateOutreachMessageInputSchema>;

const GenerateOutreachMessageOutputSchema = z.object({
  outreachMessage: z.string().describe('The personalized outreach message for the influencer.'),
});
export type GenerateOutreachMessageOutput = z.infer<typeof GenerateOutreachMessageOutputSchema>;

export async function generateOutreachMessage(input: GenerateOutreachMessageInput): Promise<GenerateOutreachMessageOutput> {
  return generateOutreachMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateOutreachMessagePrompt',
  input: {schema: GenerateOutreachMessageInputSchema},
  output: {schema: GenerateOutreachMessageOutputSchema},
  prompt: `You are an expert in crafting personalized outreach messages for influencer marketing campaigns.

  Based on the influencer's profile data, content analysis, brand details, and campaign objectives, generate a compelling and non-spammy outreach message.

  Influencer Name: {{{influencerName}}}
  Influencer Profile Data: {{{influencerProfileData}}}
  Content Analysis Summary: {{{contentAnalysisSummary}}}
  Brand Name: {{{brandName}}}
  Campaign Details: {{{campaignDetails}}}

  Outreach Message:`,
});

const generateOutreachMessageFlow = ai.defineFlow(
  {
    name: 'generateOutreachMessageFlow',
    inputSchema: GenerateOutreachMessageInputSchema,
    outputSchema: GenerateOutreachMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
