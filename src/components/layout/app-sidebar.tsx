
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
import { Home, Users, BarChart2, Send, Share2, User, LogOut } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';

// In a real application, you would fetch this data from your authentication provider.
const user = {
    name: 'Yogi',
    email: 'yogi@example.com',
    avatar: 'https://placehold.co/40x40.png',
    fallback: 'Y',
};

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
            <Share2 className="w-8 h-8 text-primary" />
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
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 p-2 w-full text-left rounded-md hover:bg-sidebar-accent">
                    <Avatar className="w-8 h-8">
                        <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="person" />
                        <AvatarFallback>{user.fallback}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-sidebar-foreground">{user.name}</span>
                        <span className="text-xs text-sidebar-foreground/70">{user.email}</span>
                    </div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mb-2 ml-2" side="top" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/login">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </>
  );
}
