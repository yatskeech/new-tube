'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { UserAvatar } from '@/shared/ui';

export function UserSidebarMenuItem() {
  const { user } = useUser();
  const { state } = useSidebar();

  if (!user) {
    return <UserAvatarSkeleton />;
  }

  if (state === 'collapsed') {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton tooltip="Your profile" asChild>
          <Link href="/users/current">
            <UserAvatar
              name={user.fullName ?? 'User'}
              imageUrl={user.imageUrl}
              size="xs"
            />
            <span className="text-sm">Your profile</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem className="flex items-center justify-center pb-4">
      <Link href="/users/current">
        <UserAvatar
          name={user.fullName ?? 'User'}
          imageUrl={user.imageUrl}
          className="size-[112px] transition-opacity hover:opacity-80"
        />
      </Link>
      <div className="mt-2 flex flex-col items-center gap-1">
        <span className="text-sm font-medium">Your profile</span>
        <span className="text-muted-foreground text-xs">
          {user.fullName ?? 'User'}
        </span>
      </div>
    </SidebarMenuItem>
  );
}

function UserAvatarSkeleton() {
  return (
    <SidebarMenuItem className="flex items-center justify-center pb-4">
      <Skeleton className="size-[112px] rounded-full" />
      <div className="mt-2 flex flex-col items-center gap-1">
        <span className="text-sm font-medium">Your profile</span>
        <Skeleton className="text-red w-24 text-xs">&nbsp;</Skeleton>
      </div>
    </SidebarMenuItem>
  );
}
