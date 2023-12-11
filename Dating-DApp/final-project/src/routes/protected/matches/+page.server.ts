import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({
	locals: {
		session: { user_id }
	}
}) => {
	const likes = await prisma.swipe.findMany({
		where: {
			OR: [
				{
					profileId: user_id
				},
				{
					swipedProfileId: user_id
				}
			],
			AND: {
				likedBack: true
			}
		},
		include: {
			profile: true,
			swipedProfile: true
		}
	});
	const matches = likes.map((like) => {
		return {
			profile: like.profileId == user_id ? like.swipedProfile : like.profile
		};
	});
	console.log(matches);

	return {
		matches
	};
}) satisfies PageServerLoad;
