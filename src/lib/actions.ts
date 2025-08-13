
'use server';

import { generateOutreachMessage } from '@/ai/flows/generate-outreach-message';
import { summarizeContentAnalysis } from '@/ai/flows/summarize-content-analysis';
import { z } from 'zod';

const analysisSchema = z.object({
  content: z.string().min(50, 'Please provide at least 50 characters of content to analyze.'),
});

export async function getAnalysisSummary(prevState: any, formData: FormData) {
  const validatedFields = analysisSchema.safeParse({
    content: formData.get('content'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.content?.[0] || 'Invalid input.',
    };
  }

  try {
    const result = await summarizeContentAnalysis({
      contentAnalysis: validatedFields.data.content,
    });
    return { summary: result.summary };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to generate summary. Please try again.' };
  }
}

const outreachSchema = z.object({
    influencerName: z.string().min(1, 'Influencer name is required.'),
    brandName: z.string().min(1, 'Brand name is required.'),
    campaignDetails: z.string().min(10, 'Campaign details are required.'),
});

export async function getOutreachMessage(prevState: any, formData: FormData) {
    const validatedFields = outreachSchema.safeParse({
        influencerName: formData.get('influencerName'),
        brandName: formData.get('brandName'),
        campaignDetails: formData.get('campaignDetails'),
    });

    if (!validatedFields.success) {
        return {
            error: Object.values(validatedFields.error.flatten().fieldErrors).flat()[0] || 'Invalid input.',
        };
    }
    
    // For this demo, we'll use mock profile data and content summary
    const mockProfileData = "A passionate creator focused on sustainable fashion and lifestyle.";
    const mockContentSummary = "Posts feature thrifted outfits, DIY projects, and eco-friendly product reviews. High engagement on posts related to brand collaborations that align with sustainability values.";

    try {
        const result = await generateOutreachMessage({
            ...validatedFields.data,
            influencerProfileData: mockProfileData,
            contentAnalysisSummary: mockContentSummary,
        });
        return { message: result.outreachMessage };
    } catch (e) {
        console.error(e);
        return { error: 'Failed to generate message. Please try again.' };
    }
}

const profileSchema = z.object({
    name: z.string().min(1, 'Name is required.'),
    email: z.string().email('Invalid email address.'),
    bio: z.string().optional(),
});

export async function updateProfile(prevState: any, formData: FormData) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    
    const validatedFields = profileSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        bio: formData.get('bio'),
    });

    if (!validatedFields.success) {
        return {
            error: Object.values(validatedFields.error.flatten().fieldErrors).flat()[0] || 'Invalid input.',
            message: '',
        };
    }

    // In a real app, you'd save this to a database.
    console.log('Profile updated:', validatedFields.data);

    return { 
        message: 'Profile updated successfully!',
        error: '',
        data: validatedFields.data,
     };
}
