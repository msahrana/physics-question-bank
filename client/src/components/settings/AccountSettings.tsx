'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function AccountSettings() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold">Account Preferences</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Manage your account preferences and regional settings.
                </p>
            </div>

            <div className="space-y-5 rounded-xl border p-5">
                <div className="space-y-2">
                    <Label>Username</Label>
                    <Input placeholder="Enter username" />
                </div>

                <div className="space-y-2">
                    <Label>Language</Label>
                    <Select defaultValue="en">
                        <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="bn">বাংলা</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select defaultValue="asia-dhaka">
                        <SelectTrigger>
                            <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="asia-dhaka">
                                Asia/Dhaka (GMT+6)
                            </SelectItem>
                            <SelectItem value="utc">UTC</SelectItem>
                            <SelectItem value="asia-kolkata">
                                Asia/Kolkata
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex justify-end border-t pt-5">
                    <Button>Save Preferences</Button>
                </div>
            </div>
        </div>
    );
}
