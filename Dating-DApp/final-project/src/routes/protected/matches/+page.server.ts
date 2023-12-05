import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	/** 
    * TODO - ADD IN ACTUAL PRISMA QUERY
    * ? - USE CLOUDFLARE DURABLE OBJECTS FOR CONVERSATIONS
      const profiles = await prisma.user.findMany({
         where: {
            
         }
      });
   */

	return {};
}) satisfies PageServerLoad;
