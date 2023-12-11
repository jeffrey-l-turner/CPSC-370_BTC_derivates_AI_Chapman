import { prisma } from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({
	locals: {
		session: { user_id }
	}
}) => {
	const profile = await prisma.profile.findUnique({
		select: {
			interestedIn: true
		},
		where: {
			id: user_id
		}
	});
	return { profile };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({
		request,
		locals: {
			session: { user_id }
		}
	}) => {
		const submission = await request.formData();
		const interestedIn = submission.get('interestedIn') as string;

		await prisma.profile.update({
			where: {
				id: user_id
			},
			data: {
				interestedIn
			}
		});
	}
} satisfies Actions;
