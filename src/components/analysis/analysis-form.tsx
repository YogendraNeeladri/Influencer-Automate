
'use client';

import { useActionState, useFormStatus } from 'react';
import { getAnalysisSummary } from '@/lib/actions';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Bot, Terminal } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

const initialState = {
  summary: '',
  error: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? 'Analyzing...' : 'Analyze Content'}
    </Button>
  );
}

export function AnalysisForm() {
  const [state, formAction] = useActionState(getAnalysisSummary, initialState);
  const { pending } = useFormStatus();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  useEffect(() => {
    if(state?.error) {
        toast({
            variant: "destructive",
            title: "Analysis Failed",
            description: state.error,
        })
    }
    if(state?.summary) {
        formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <form ref={formRef} action={formAction} className="space-y-4">
            <div className="grid w-full gap-1.5">
                <label htmlFor="content" className="text-sm font-medium">
                    Influencer Content
                </label>
                <Textarea
                    id="content"
                    name="content"
                    placeholder="Paste scraped content here (e.g., post captions, comments, video transcripts)..."
                    rows={15}
                    required
                    className="min-h-[300px]"
                />
                 <p className="text-sm text-muted-foreground">
                    Provide at least 50 characters of content for an effective analysis.
                </p>
            </div>
            <SubmitButton />
        </form>
        
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Analysis Summary</h3>
            {pending ? (
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-3/4" />
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </CardContent>
                </Card>
            ) : state?.summary ? (
                <Card>
                    <CardHeader className='flex-row gap-2 items-center'>
                        <Bot className="w-6 h-6 text-primary"/>
                        <CardTitle className="text-xl">AI-Generated Insights</CardTitle>
                    </CardHeader>
                    <CardContent className="prose-sm max-w-none text-foreground/80">
                        <p>{state.summary}</p>
                    </CardContent>
                </Card>
            ) : (
                <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Awaiting Analysis</AlertTitle>
                    <AlertDescription>
                        The generated summary will appear here once you submit content for analysis.
                    </AlertDescription>
                </Alert>
            )}
        </div>
    </div>
  );
}
