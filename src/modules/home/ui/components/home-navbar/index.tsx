import Image from 'next/image';
import Link from 'next/link';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { AuthButton } from '@/modules/auth/ui';

import { SearchInput } from './search-input';

export function HomeNavbar() {
  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 flex h-16 items-center gap-4
        bg-white px-4 sm:px-6 lg:px-8"
    >
      <div className="flex shrink-0 items-center gap-2">
        <SidebarTrigger />
        <Link href="/" className="flex items-center gap-1 p-2">
          <Image src="/logo.svg" alt="Logo" width={32} height={32} />
          <span className="text-xl font-semibold tracking-tight">NewTube</span>
        </Link>
      </div>
      <div className="flex flex-1 justify-center">
        <SearchInput />
      </div>
      <div className="shrink-0">
        <AuthButton />
      </div>
    </header>
  );
}
