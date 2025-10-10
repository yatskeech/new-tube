import Image from 'next/image';
import Link from 'next/link';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { AuthButton } from '@/modules/auth/ui';
import { StudioUploadModal } from '@/shared/ui';

export function StudioNavbar() {
  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 flex h-16 items-center
        justify-between gap-4 border-b bg-white px-4 shadow-md sm:px-6 lg:px-8"
    >
      <div className="flex shrink-0 items-center gap-2">
        <SidebarTrigger />
        <Link href="/studio" className="flex items-center gap-1 p-2">
          <Image src="/logo.svg" alt="Logo" width={32} height={32} />
          <span className="text-xl font-semibold tracking-tight">Studio</span>
        </Link>
      </div>
      <div className="flex shrink-0 items-center gap-4">
        <StudioUploadModal />
        <AuthButton />
      </div>
    </header>
  );
}
