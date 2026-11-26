'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar';

import { SidebarItems } from '@/interface';
import { adminRoutes, studentRoutes, teacherRoutes } from '@/routes';
import { UserRole } from '@/types';

const sidebarRoutes: Partial<Record<UserRole, SidebarItems>> = {
    SUPER_ADMIN: adminRoutes,
    ADMIN: adminRoutes,
    TEACHER: teacherRoutes,
    STUDENT: studentRoutes,
};

export function DashboardSidebar({ role }: { role: UserRole }) {
    const pathname = usePathname();

    const routes = sidebarRoutes[role] ?? [];

    return (
        <Sidebar>
            <SidebarHeader>
                <Link href="/" className="flex items-center gap-2 px-2 pt-20">
                    <Image
                        src="/logo-icon.png"
                        alt="Physics Academy"
                        width={40}
                        height={40}
                        priority
                        className="object-contain"
                    />

                    <span className="font-semibold">Physics Academy</span>
                </Link>
            </SidebarHeader>

            <SidebarContent>
                {routes.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupLabel className="font-bold uppercase text-black">
                            {group.title}
                        </SidebarGroupLabel>

                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => {
                                    const isActive =
                                        pathname === item.url ||
                                        (item.url !== '/student' &&
                                            item.url !== '/admin' &&
                                            pathname.startsWith(
                                                `${item.url}/`,
                                            ));

                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                render={
                                                    <Link href={item.url} />
                                                }
                                                isActive={isActive}
                                                className={
                                                    isActive
                                                        ? 'text-blue-600 font-bold'
                                                        : 'text-muted-foreground'
                                                }
                                            >
                                                {item.title}
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarRail />
        </Sidebar>
    );
}
