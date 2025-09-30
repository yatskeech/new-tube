import { HomeLayout } from '@/modules/home/ui';

function Layout({ children }: { children: React.ReactNode }) {
  return <HomeLayout>{children}</HomeLayout>;
}

export default Layout;
