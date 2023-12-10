import { prisma } from '$lib/server/prisma';
import { Prisma } from '@prisma/client';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({
	locals: {
		session: { user_id }
	}
}) => {
	const profile = await prisma.profile.findUnique({
		where: {
			id: user_id
		}
	});

	const feed = await prisma.profile.findMany({
		where: {
			NOT: {
				swipedBy: {
					some: { profileId: user_id }
				}
			},
			gender: profile?.interestedIn,
			id: {
				not: user_id
			}
		}
	});

	return { feed };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({
		request,
		locals: {
			session: { user_id }
		}
	}) => {
		const { swipedProfileId, liked } = await request.json();

		await prisma.swipe.upsert({
			where: {
				profileId_swipedProfileId: {
					profileId: swipedProfileId,
					swipedProfileId: user_id
				}
			},
			create: {
				profileId: user_id,
				swipedProfileId,
				liked
			},
			update: {
				likedBack: liked as boolean
			}
		});
	}
} satisfies Actions;
