import { Suspense } from 'react';

import { HydrateClient, prefetch, trpc } from '@/trpc/server';

import { UserGreeting } from './greeting';

export default async function Page() {
  prefetch(trpc.hello.queryOptions({ text: 'world' }));

  return (
    <HydrateClient>
      <Suspense fallback={<span>Loading...</span>}>
        I will videos in the future: <UserGreeting />
      </Suspense>
    </HydrateClient>
  );
}
