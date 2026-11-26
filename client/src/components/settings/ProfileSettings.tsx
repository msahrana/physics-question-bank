'use client';

import { Camera, Save } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProfileSettings() {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
        bio: '',
    });

    const handleChange = (field: keyof typeof profile, value: string) => {
        setProfile((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // TODO: Connect update profile API
        console.log(profile);
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold">Profile Information</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Update your personal information and profile details.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Avatar */}
                <div className="flex flex-col gap-4 rounded-xl border p-5 sm:flex-row sm:items-center">
                    <Avatar className="size-20">
                        <AvatarImage src="" alt="Profile" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>

                    <div className="space-y-2">
                        <p className="font-medium">Profile Picture</p>

                        <p className="text-xs text-muted-foreground">
                            JPG, PNG or WEBP. Maximum size 5MB.
                        </p>

                        <Button type="button" variant="outline" size="sm">
                            <Camera className="mr-2 size-4" />
                            Upload Photo
                        </Button>
                    </div>
                </div>

                {/* Form */}
                <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input
                            placeholder="Enter your full name"
                            value={profile.name}
                            onChange={(e) =>
                                handleChange('name', e.target.value)
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Email Address</Label>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={profile.email}
                            onChange={(e) =>
                                handleChange('email', e.target.value)
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <Input
                            placeholder="+880 1XXXXXXXXX"
                            value={profile.phone}
                            onChange={(e) =>
                                handleChange('phone', e.target.value)
                            }
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Bio</Label>
                    <Textarea
                        placeholder="Write something about yourself..."
                        rows={4}
                        value={profile.bio}
                        onChange={(e) => handleChange('bio', e.target.value)}
                    />
                </div>

                <div className="flex justify-end border-t pt-5">
                    <Button type="submit">
                        <Save className="mr-2 size-4" />
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
}
