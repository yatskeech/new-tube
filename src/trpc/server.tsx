import 'server-only';

import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';
import { cache } from 'react';

import { createTRPCContext } from './init';
import { makeQueryClient } from './query-client';
import { appRouter } from './routers/_app';

export const caller = appRouter.createCaller(createTRPCContext);
export const getQueryClient = cache(makeQueryClient);
export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
});
