import type { PageServerLoad } from './$types';

export const load = (async () => {
	/** 
    * TODO - ADD IN USER AUTH WITH SOMETHING LIKE STYTCH
      const profiles = await prisma.user.findMany({
         where: {
            
         }
      });
   */
	return {
		name: 'John Doe',
		email: 'name@example.com'
	};
}) satisfies PageServerLoad;
