import { prisma } from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({
	locals: {
		session: { user_id }
	}
}) => {
	const feed = await prisma.profile.findMany({
		// add filters on city, interested in, etc.
		// exclude people already swiped on
		where: {
			NOT: {
				swipedBy: {
					some: { profileId: user_id }
				}
			},
			id: {
				not: user_id
			}
		}
	});

	return { feed };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const x;
	}
} satisfies Actions;
