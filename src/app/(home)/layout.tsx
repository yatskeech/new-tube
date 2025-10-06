import { HomeLayout } from '@/modules/home/ui';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <HomeLayout>{children}</HomeLayout>;
}
