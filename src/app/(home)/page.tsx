import { HomeView } from '@/modules/home/ui';
import { HydrateClient, prefetch, trpc } from '@/trpc/server';

export const dynamic = 'force-dynamic';

export default async function Page() {
  prefetch(trpc.categories.getMany.queryOptions());

  return (
    <HydrateClient>
      <HomeView />
    </HydrateClient>
  );
}
