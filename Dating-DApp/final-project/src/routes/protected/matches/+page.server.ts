import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({
	locals: {
		session: { user_id }
	}
}) => {
	const likes = await prisma.like.findMany({
		where: {
			OR: [
				{
					profileId: user_id
				},
				{
					likedProfileId: user_id
				}
			],
			AND: {
				likedBack: true
			}
		},
		include: {
			profile: true,
			likedProfile: true
		}
	});
	const matches = likes.map((like) => {
		return {
			profile: like.profileId == user_id ? like.likedProfile : like.profile
		};
	});

	return {
		matches
	};
}) satisfies PageServerLoad;
