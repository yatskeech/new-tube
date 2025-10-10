'use client';

import { LogOutIcon, VideoIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { StudioSidebarHeader } from './studio-sidebar-header';

export function StudioSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="z-40 pt-16" collapsible="icon">
      <SidebarContent className="bg-background">
        <SidebarGroup>
          <SidebarGroupContent>
            <StudioSidebarHeader />
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === '/studio'}
                  tooltip="Content"
                  asChild
                >
                  <Link href="/studio">
                    <VideoIcon className="size-5" />
                    <span className="text-md">Content</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <Separator />
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Exit studio" asChild>
                  <Link href="/">
                    <LogOutIcon className="size-5" />
                    <span className="text-md">Exit studio</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
