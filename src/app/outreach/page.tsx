import { OutreachForm } from "@/components/outreach/outreach-form";
import { Send } from "lucide-react";

export default function OutreachPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Influencer Outreach</h2>
      </div>
      <div className="flex-1 space-y-4">
        <div className="flex items-start space-x-4 rounded-lg border border-dashed p-4">
            <Send className="h-6 w-6 mt-1 text-primary" />
            <div className="flex-1">
                <h3 className="text-lg font-semibold">Automate Outreach</h3>
                <p className="text-sm text-muted-foreground">
                    Generate personalized, non-spammy outreach messages for influencers at scale. Provide a few details, and our AI will craft the perfect introduction.
                </p>
            </div>
        </div>
        <OutreachForm />
      </div>
    </div>
  );
}
