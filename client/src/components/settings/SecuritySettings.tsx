'use client';

import { useState } from 'react';

import { Eye, EyeOff, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function SecuritySettings() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold">Security</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Protect your account with strong security settings.
                </p>
            </div>

            <div className="space-y-5 rounded-xl border p-5">
                <h3 className="font-semibold">Change Password</h3>

                <div className="space-y-2">
                    <Label>Current Password</Label>
                    <Input type="password" placeholder="Current password" />
                </div>

                <div className="space-y-2">
                    <Label>New Password</Label>
                    <div className="relative">
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="New password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? (
                                <EyeOff className="size-4" />
                            ) : (
                                <Eye className="size-4" />
                            )}
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Confirm New Password</Label>
                    <Input type="password" placeholder="Confirm password" />
                </div>

                <div className="flex justify-end border-t pt-5">
                    <Button>Update Password</Button>
                </div>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-xl border p-5">
                <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-1 size-5 text-primary" />
                    <div>
                        <p className="font-semibold">
                            Two-Factor Authentication
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Add an extra layer of security to your account.
                        </p>
                    </div>
                </div>

                <Switch />
            </div>
        </div>
    );
}
