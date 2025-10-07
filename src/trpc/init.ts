import { auth } from '@clerk/nextjs/server';
import { initTRPC, TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { cache } from 'react';
import superjson from 'superjson';

import { db } from '@/db';
import { usersTable } from '@/db/schema';
import { ratelimit } from '@/lib/ratelimit';

export const createTRPCContext = cache(async () => {
  const { userId } = await auth();
  return { clerkUserId: userId };
});

type Context = Awaited<ReturnType<typeof createTRPCContext>>;
const t = initTRPC.context<Context>().create({ transformer: superjson });

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async (opts) => {
  const { ctx, next } = opts;

  if (!ctx.clerkUserId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.clerkId, ctx.clerkUserId))
    .limit(1);

  if (!user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  const { success } = await ratelimit.limit(user.id);

  if (!success) {
    throw new TRPCError({ code: 'TOO_MANY_REQUESTS' });
  }

  return next({ ctx: { ...ctx, user } });
});
