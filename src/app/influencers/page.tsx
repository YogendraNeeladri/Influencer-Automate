import { z } from 'zod';
import { columns } from '@/components/influencers/columns';
import { DataTable } from '@/components/influencers/data-table';
import { influencerSchema } from '@/components/influencers/schema';

async function getInfluencers() {
  // In a real app, you'd fetch this from a database or API.
  const data = [
    { id: 'INF-001', name: '@TechSavvy', platform: 'YouTube', followers: 1500000, engagementRate: 5.2, status: 'New' },
    { id: 'INF-002', name: '@Fashionista', platform: 'Instagram', followers: 2300000, engagementRate: 8.1, status: 'Contacted' },
    { id: 'INF-003', name: '@FoodieFinds', platform: 'Instagram', followers: 850000, engagementRate: 12.3, status: 'In talks' },
    { id: 'INF-004', name: '@GamerGod', platform: 'YouTube', followers: 5200000, engagementRate: 4.5, status: 'Signed' },
    { id: 'INF-005', name: '@TravelBug', platform: 'Instagram', followers: 1200000, engagementRate: 9.8, status: 'New' },
    { id: 'INF-006', name: '@DIYQueen', platform: 'YouTube', followers: 780000, engagementRate: 6.7, status: 'Contacted' },
    { id: 'INF-007', name: '@FitnessGuru', platform: 'Instagram', followers: 3100000, engagementRate: 7.2, status: 'New' },
    { id: 'INF-008', name: '@BookWorm', platform: 'YouTube', followers: 450000, engagementRate: 9.1, status: 'In talks' },
    { id: 'INF-009', name: '@ArtisanChef', platform: 'Instagram', followers: 600000, engagementRate: 11.5, status: 'New' },
    { id: 'INF-010', name: '@EcoWarrior', platform: 'YouTube', followers: 950000, engagementRate: 8.4, status: 'Signed' },
  ];
  return z.array(influencerSchema).parse(data);
}

export default async function InfluencersPage() {
  const influencers = await getInfluencers();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 h-full flex flex-col">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Influencers</h2>
      </div>
      <DataTable data={influencers} columns={columns} />
    </div>
  );
}
