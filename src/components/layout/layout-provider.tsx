
'use client';

import { usePathname } from 'next/navigation';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebarContent } from '@/components/layout/app-sidebar';

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === '/login' || pathname === '/register') {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <AppSidebarContent />
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
