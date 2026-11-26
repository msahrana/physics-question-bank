'use client';

import { useState } from 'react';

import { Bell } from 'lucide-react';

import { Switch } from '@/components/ui/switch';

const notificationOptions = [
    {
        title: 'Email Notifications',
        description: 'Receive important updates through email.',
    },
    {
        title: 'Course Updates',
        description: 'Get notified about new lessons and course materials.',
    },
    {
        title: 'Exam Reminders',
        description: 'Receive reminders about upcoming examinations.',
    },
    {
        title: 'Assignment Updates',
        description: 'Get notified about new assignments and deadlines.',
    },
    {
        title: 'Announcements',
        description: 'Stay updated with platform announcements.',
    },
];

export default function NotificationSettings() {
    const [notifications, setNotifications] = useState(
        notificationOptions.map((item) => ({
            title: item.title,
            enabled: true,
        })),
    );

    const toggleNotification = (title: string, enabled: boolean) => {
        setNotifications((prev) =>
            prev.map((item) =>
                item.title === title ? { ...item, enabled } : item,
            ),
        );
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold">Notifications</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Choose which notifications you want to receive.
                </p>
            </div>

            <div className="divide-y rounded-xl border px-5">
                {notificationOptions.map((item) => {
                    const current = notifications.find(
                        (notification) => notification.title === item.title,
                    );

                    return (
                        <div
                            key={item.title}
                            className="flex items-center justify-between gap-4 py-5"
                        >
                            <div className="flex items-start gap-3">
                                <Bell className="mt-1 size-4 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">
                                        {item.title}
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            <Switch
                                checked={current?.enabled ?? false}
                                onCheckedChange={(checked) =>
                                    toggleNotification(item.title, checked)
                                }
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
