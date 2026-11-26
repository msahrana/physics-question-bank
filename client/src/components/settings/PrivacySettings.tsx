'use client';

import { useState } from 'react';

import { Switch } from '@/components/ui/switch';

const privacyOptions = [
    {
        title: 'Public Profile',
        description: 'Allow other users to view your profile.',
    },
    {
        title: 'Show Online Status',
        description: 'Let other users see when you are online.',
    },
    {
        title: 'Activity Visibility',
        description: 'Allow others to see your learning activity.',
    },
];

export default function PrivacySettings() {
    const [settings, setSettings] = useState([true, true, false]);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold">Privacy Settings</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Control how your information is shared.
                </p>
            </div>

            <div className="divide-y rounded-xl border px-5">
                {privacyOptions.map((option, index) => (
                    <div
                        key={option.title}
                        className="flex items-center justify-between gap-4 py-5"
                    >
                        <div>
                            <p className="text-sm font-medium">
                                {option.title}
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                {option.description}
                            </p>
                        </div>

                        <Switch
                            checked={settings[index]}
                            onCheckedChange={(checked) =>
                                setSettings((prev) =>
                                    prev.map((value, i) =>
                                        i === index ? checked : value,
                                    ),
                                )
                            }
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
