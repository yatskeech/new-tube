'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useTRPC } from '@/trpc/client';

export function UserGreeting() {
  const trpc = useTRPC();
  const queryOptions = trpc.hello.queryOptions({ text: 'world' });
  const { data } = useSuspenseQuery(queryOptions);

  return <span>{data.greeting}</span>;
}
