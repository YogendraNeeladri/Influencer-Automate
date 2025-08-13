import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, BarChart3, Users, Bot, Send } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Influencers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Engagement Rate
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.45%</div>
            <p className="text-xs text-muted-foreground">
              +1.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outreach Sent</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              AI Analyses Ran
            </CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              +12 since last day
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-3 text-primary" />
                <p className="text-sm text-muted-foreground">New influencer <span className="font-semibold text-foreground">@coolcreator</span> discovered via #Tech.
                </p>
              </div>
              <div className="flex items-center">
                <Bot className="h-5 w-5 mr-3 text-primary" />
                <p className="text-sm text-muted-foreground">Content analysis for <span className="font-semibold text-foreground">@foodiequeen</span> completed.</p>
              </div>
              <div className="flex items-center">
                <Send className="h-5 w-5 mr-3 text-primary" />
                <p className="text-sm text-muted-foreground">Outreach message sent to <span className="font-semibold text-foreground">@travelpro</span>.</p>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-3 text-primary" />
                <p className="text-sm text-muted-foreground">New influencer <span className="font-semibold text-foreground">@gamergod</span> discovered via competitor scan.</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Top Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Image src="https://placehold.co/80x80.png" alt="Trend 1" width={80} height={80} className="rounded-lg" data-ai-hint="social media trend" />
                <div>
                  <h3 className="font-semibold">"A Day in My Life" Vlogs</h3>
                  <p className="text-sm text-muted-foreground">High engagement across tech and lifestyle.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Image src="https://placehold.co/80x80.png" alt="Trend 2" width={80} height={80} className="rounded-lg" data-ai-hint="product unboxing" />
                <div>
                  <h3 className="font-semibold">Unboxing Videos</h3>
                  <p className="text-sm text-muted-foreground">Still a top format for product-focused campaigns.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
