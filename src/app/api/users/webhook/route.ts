import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';

import { db } from '@/db';
import { usersTable } from '@/db/schema';

export async function POST(req: NextRequest) {
  try {
    const { type, data } = await verifyWebhook(req);

    switch (type) {
      case 'user.created': {
        const { id, first_name, last_name, email_addresses, image_url } = data;

        await db.insert(usersTable).values({
          clerkId: id,
          name: `${first_name} ${last_name}`,
          email: email_addresses[0]?.email_address,
          imageUrl: image_url,
        });
        break;
      }
      case 'user.deleted': {
        const { id } = data;

        if (!id) {
          return new Response('No user ID', { status: 400 });
        }

        await db.delete(usersTable).where(eq(usersTable.clerkId, id));
        break;
      }
      case 'user.updated': {
        const { id, first_name, last_name, image_url } = data;

        await db
          .update(usersTable)
          .set({
            name: `${first_name} ${last_name}`,
            imageUrl: image_url,
            updatedAt: new Date(),
          })
          .where(eq(usersTable.clerkId, id));
        break;
      }
      default: {
        return new Response('Unknown webhook type', { status: 400 });
      }
    }

    return new Response('Webhook received', { status: 200 });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }
}
