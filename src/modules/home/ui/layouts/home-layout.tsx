import { SidebarProvider } from '@/components/ui/sidebar';

import { HomeNavbar, HomeSidebar } from '../components';

export function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <HomeNavbar />
      <div className="flex min-h-screen w-full pt-16">
        <HomeSidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
