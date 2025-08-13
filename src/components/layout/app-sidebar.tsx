'use client';

import { usePathname } from 'next/navigation';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Home, Users, BarChart2, Send, Bot } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export function AppSidebarContent() {
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Dashboard', icon: Home, tooltip: 'Dashboard' },
    { href: '/influencers', label: 'Influencers', icon: Users, tooltip: 'Influencers' },
    { href: '/analysis', label: 'Content Analysis', icon: BarChart2, tooltip: 'Analysis' },
    { href: '/outreach', label: 'Outreach', icon: Send, tooltip: 'Outreach' },
  ];

  return (
    <>
      <SidebarHeader className="group-data-[collapsible=icon]:justify-center">
        <Link href="/" className="flex items-center gap-2">
            <Bot className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
                Influencer Automate
            </h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.tooltip}>
                    <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="group-data-[collapsible=icon]:hidden">
        <Separator className="my-2 bg-sidebar-border" />
        <div className="flex items-center gap-3 p-2">
            <Avatar className="w-8 h-8">
                <AvatarImage src="https://placehold.co/40x40.png" alt="@user" data-ai-hint="person" />
                <AvatarFallback>UA</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className="text-sm font-semibold text-sidebar-foreground">User Admin</span>
                <span className="text-xs text-sidebar-foreground/70">admin@example.com</span>
            </div>
        </div>
      </SidebarFooter>
    </>
  );
}
