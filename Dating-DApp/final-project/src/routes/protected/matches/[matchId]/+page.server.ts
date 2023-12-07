import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({
	locals: {
		session: { user_id }
	},
	params: { matchId }
}) => {
	const messages = await prisma.message.findMany({
		where: {
			OR: [
				{
					senderId: matchId,
					receiverId: user_id
				},
				{
					senderId: user_id,
					receiverId: matchId
				}
			]
		},
		orderBy: {
			sentAt: 'desc'
		},
		take: 15
	});
	return {};
}) satisfies PageServerLoad;
