'use client';

import { AlertTriangle, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function DangerZone() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold">Danger Zone</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Manage sensitive account actions.
                </p>
            </div>

            <div className="space-y-5 rounded-xl border border-destructive/30 p-5">
                <div>
                    <div className="flex items-center gap-2 text-destructive">
                        <AlertTriangle className="size-5" />
                        <h3 className="font-semibold">Deactivate Account</h3>
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Temporarily disable your account. You may lose access
                        until your account is reactivated.
                    </p>

                    <Button
                        variant="outline"
                        className="mt-4 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => {
                            // TODO: Implement account deactivation
                        }}
                    >
                        Deactivate Account
                    </Button>
                </div>

                <div className="border-t pt-5">
                    <div className="flex items-center gap-2 text-destructive">
                        <Trash2 className="size-5" />
                        <h3 className="font-semibold">Delete Account</h3>
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Permanently delete your account and associated data.
                        This action cannot be undone.
                    </p>

                    <Button
                        variant="destructive"
                        className="mt-4"
                        onClick={() => {
                            // TODO: Add confirmation dialog and delete API
                        }}
                    >
                        Delete Account
                    </Button>
                </div>
            </div>
        </div>
    );
}
