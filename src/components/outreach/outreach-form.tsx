
'use client';

import { useActionState, useFormStatus } from 'react';
import { getOutreachMessage } from '@/lib/actions';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Mail, Bot } from 'lucide-react';
import { Label } from '../ui/label';
import { Skeleton } from '../ui/skeleton';

const initialState = {
  message: '',
  error: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? 'Generating...' : 'Generate Message'}
    </Button>
  );
}

export function OutreachForm() {
  const [state, formAction] = useActionState(getOutreachMessage, initialState);
  const { pending } = useFormStatus();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  useEffect(() => {
    if(state?.error) {
        toast({
            variant: "destructive",
            title: "Message Generation Failed",
            description: state.error,
        })
    }
    if(state?.message) {
        formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <form ref={formRef} action={formAction} className="space-y-4">
            <div className="grid w-full gap-1.5">
                <Label htmlFor="influencerName">Influencer's Name</Label>
                <Input
                    id="influencerName"
                    name="influencerName"
                    placeholder="e.g., @TechSavvy"
                    required
                />
            </div>
            <div className="grid w-full gap-1.5">
                <Label htmlFor="brandName">Your Brand's Name</Label>
                <Input
                    id="brandName"
                    name="brandName"
                    placeholder="e.g., NextGen Gadgets"
                    required
                />
            </div>
            <div className="grid w-full gap-1.5">
                <Label htmlFor="campaignDetails">Campaign Details</Label>
                <Textarea
                    id="campaignDetails"
                    name="campaignDetails"
                    placeholder="Briefly describe the campaign goal, e.g., 'Promote our new smart home device to a tech-savvy audience.'"
                    rows={5}
                    required
                />
            </div>
            <SubmitButton />
        </form>
        
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Generated Message</h3>
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
            ) : state?.message ? (
                <Card>
                    <CardHeader className='flex-row gap-2 items-center'>
                         <Bot className="w-6 h-6 text-primary"/>
                        <CardTitle className="text-xl">Personalized Outreach Email</CardTitle>
                    </CardHeader>
                    <CardContent className="prose-sm max-w-none whitespace-pre-wrap text-foreground/80">
                        <p>{state.message}</p>
                    </CardContent>
                </Card>
            ) : (
                <Alert>
                    <Mail className="h-4 w-4" />
                    <AlertTitle>Awaiting Details</AlertTitle>
                    <AlertDescription>
                        The generated outreach message will appear here once you fill out the form.
                    </AlertDescription>
                </Alert>
            )}
        </div>
    </div>
  );
}
