import { SidebarProvider } from '@/components/ui/sidebar';

import { StudioNavbar, StudioSidebar } from '../components';

export function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <StudioNavbar />
      <div className="flex min-h-screen w-full pt-16">
        <StudioSidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
