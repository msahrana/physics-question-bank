'use client';

import { useState } from 'react';

import {
    UserRound,
    Settings2,
    ShieldCheck,
    Bell,
    LockKeyhole,
    Trash2,
} from 'lucide-react';
import ProfileSettings from './ProfileSettings';
import AccountSettings from './AccountSettings';
import SecuritySettings from './SecuritySettings';
import NotificationSettings from './NotificationSettings';
import PrivacySettings from './PrivacySettings';
import DangerZone from './DangerZone';

const settingsTabs = [
    {
        label: 'Profile',
        description: 'Manage your personal information',
        icon: UserRound,
    },
    {
        label: 'Account',
        description: 'Manage your account preferences',
        icon: Settings2,
    },
    {
        label: 'Security',
        description: 'Manage password and security',
        icon: ShieldCheck,
    },
    {
        label: 'Notifications',
        description: 'Manage your notifications',
        icon: Bell,
    },
    {
        label: 'Privacy',
        description: 'Manage your privacy preferences',
        icon: LockKeyhole,
    },
    {
        label: 'Danger Zone',
        description: 'Manage account deletion',
        icon: Trash2,
    },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('Profile');

    const renderContent = () => {
        switch (activeTab) {
            case 'Profile':
                return <ProfileSettings />;

            case 'Account':
                return <AccountSettings />;

            case 'Security':
                return <SecuritySettings />;

            case 'Notifications':
                return <NotificationSettings />;

            case 'Privacy':
                return <PrivacySettings />;

            case 'Danger Zone':
                return <DangerZone />;

            default:
                return <ProfileSettings />;
        }
    };

    return (
        <div className="mx-auto w-full max-w-7xl space-y-8 p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                    Settings
                </h1>

                <p className="mt-2 text-sm text-muted-foreground">
                    Manage your account settings and preferences.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
                {/* Sidebar */}
                <aside className="space-y-2">
                    {settingsTabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.label;

                        return (
                            <button
                                key={tab.label}
                                type="button"
                                onClick={() => setActiveTab(tab.label)}
                                className={`flex w-full items-start gap-3 rounded-xl p-3 text-left transition-colors ${
                                    isActive
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                }`}
                            >
                                <Icon className="mt-0.5 size-5 shrink-0" />

                                <div className="min-w-0">
                                    <p className="text-sm font-semibold">
                                        {tab.label}
                                    </p>

                                    <p className="mt-1 text-xs">
                                        {tab.description}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </aside>

                {/* Content */}
                <main className="min-w-0">{renderContent()}</main>
            </div>
        </div>
    );
}
