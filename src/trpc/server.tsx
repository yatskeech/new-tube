import 'server-only';

import {
  dehydrate,
  FetchInfiniteQueryOptions,
  HydrationBoundary,
} from '@tanstack/react-query';
import {
  createTRPCOptionsProxy,
  ResolverDef,
  TRPCQueryOptions,
} from '@trpc/tanstack-react-query';
import { cache } from 'react';

import { createTRPCContext } from './init';
import { makeQueryClient } from './query-client';
import { appRouter } from './routers/_app';

export function HydrateClient(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  );
}

export function prefetch<T extends ResolverDef>(
  queryOptions: ReturnType<TRPCQueryOptions<T>>,
) {
  const queryClient = getQueryClient();

  if (queryOptions.queryKey[1]?.type === 'infinite') {
    void queryClient.prefetchInfiniteQuery(
      queryOptions as unknown as FetchInfiniteQueryOptions,
    );
  } else {
    void queryClient.prefetchQuery(queryOptions);
  }
}

export const caller = appRouter.createCaller(createTRPCContext);
export const getQueryClient = cache(makeQueryClient);
export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
});
