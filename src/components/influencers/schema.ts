import { z } from 'zod';

export const influencerSchema = z.object({
  id: z.string(),
  name: z.string(),
  platform: z.enum(['YouTube', 'Instagram']),
  followers: z.number(),
  engagementRate: z.number(),
  status: z.enum(['New', 'Contacted', 'In talks', 'Signed']),
});

export type Influencer = z.infer<typeof influencerSchema>;
