import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	/** 
    * TODO - ADD IN ACTUAL PRISMA QUERY
      const profiles = await prisma.user.findMany({
         where: {
            
         }
      });
   */

	return {};
}) satisfies PageServerLoad;
