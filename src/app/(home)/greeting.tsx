import { caller } from '@/trpc/server';

export async function UserGreeting() {
  const { greeting } = await caller.hello({ text: 'world' });
  return <span>{greeting}</span>;
}
