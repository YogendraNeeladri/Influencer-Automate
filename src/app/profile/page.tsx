
'use client';

import { useActionState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfile } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';
import { SubmitButton } from '@/components/profile/submit-button';
import { useUser } from '@/context/user-context';
import { Textarea } from '@/components/ui/textarea';

const initialState = {
    message: '',
    error: '',
    data: null,
};

export default function ProfilePage() {
    const { toast } = useToast();
    const { user, updateUser } = useUser();
    const [state, formAction] = useActionState(updateProfile, initialState);
    
    useEffect(() => {
        if (state?.error) {
            toast({
                variant: "destructive",
                title: "Update Failed",
                description: state.error,
            });
        }
        if (state?.message && state.data) {
            toast({
                title: "Success",
                description: state.message,
            });
            updateUser(state.data);
        }
    }, [state, toast, updateUser]);

    if (!user) {
        return (
             <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
                 <Card>
                    <CardHeader>
                        <CardTitle>Please Log In</CardTitle>
                        <CardDescription>You need to be logged in to view your profile.</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
    }

    const handlePhotoChange = () => {
        // In a real app, this would open a file picker and upload a new image.
        // For this demo, we'll just cycle through some placeholders.
        const newAvatar = `https://placehold.co/80x80.png?text=${user.name.charAt(0)}`;
        updateUser({ avatar: newAvatar });
    };

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
            <Card>
                <CardHeader>
                    <CardTitle>Your Information</CardTitle>
                    <CardDescription>Update your personal details here.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <Avatar className="w-20 h-20">
                                <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="person" />
                                <AvatarFallback>{user.fallback}</AvatarFallback>
                            </Avatar>
                            <Button variant="outline" type="button" onClick={handlePhotoChange}>Change Photo</Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" defaultValue={user.name} key={user.name} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" defaultValue={user.email} key={user.email} />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                                id="bio"
                                name="bio"
                                placeholder="Tell us a little about yourself"
                                defaultValue={user.bio}
                                key={user.bio}
                            />
                        </div>
                        <SubmitButton />
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
