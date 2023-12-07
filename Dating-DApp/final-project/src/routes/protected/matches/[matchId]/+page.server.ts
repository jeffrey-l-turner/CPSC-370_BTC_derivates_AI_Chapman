import { prisma } from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

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
	return { messages, user_id };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({
		request,
		locals: {
			session: { user_id }
		},
		params: { matchId }
	}) => {
		const submission = await request.formData();
		const message = submission.get('message');

		if (typeof message != 'string') {
			return fail(400);
		}

		await prisma.message.create({
			data: {
				message,
				senderId: user_id,
				receiverId: matchId
			}
		});
	}
} satisfies Actions;
