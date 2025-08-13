import { AnalysisForm } from "@/components/analysis/analysis-form";
import { Bot } from "lucide-react";

export default function AnalysisPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Content Analysis</h2>
      </div>
      <div className="flex-1 space-y-4">
        <div className="flex items-start space-x-4 rounded-lg border border-dashed p-4">
            <Bot className="h-6 w-6 mt-1 text-primary" />
            <div className="flex-1">
                <h3 className="text-lg font-semibold">Analyze Content at Scale</h3>
                <p className="text-sm text-muted-foreground">
                    Paste in scraped content from an influencer to get an AI-powered analysis. The model will extract insights like engagement patterns, recurring themes, and audience sentiment to help you make better decisions.
                </p>
            </div>
        </div>
        <AnalysisForm />
      </div>
    </div>
  );
}
