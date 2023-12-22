import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

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

	return {
		profile
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({
		request,
		locals: {
			session: { user_id }
		}
	}) => {
		const submission = await request.formData();

		const firstname = submission.get('firstname');
		const lastname = submission.get('lastname');
		const bio = submission.get('bio');
		const dob = submission.get('dob');
		const gender = submission.get('gender');
		if (
			typeof firstname != 'string' ||
			typeof lastname != 'string' ||
			typeof bio != 'string' ||
			typeof dob != 'string' ||
			typeof gender != 'string'
		) {
			return fail(400);
		}

		const photo = submission.get('photo') as File;
		let photoUrl = '';
		if (photo.size > 0) {
			const body = new FormData();
			body.append('file', photo);
			body.append('fileName', user_id + '/' + photo.name);
			const res = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
				method: 'POST',
				headers: {
					Authorization: `Basic ${btoa('private_sUVuV7BqDw0/eVoZ6QyCaOVFZv8=:')}`
				},
				body
			});

			const data = await res.json();
			console.log(data);
			photoUrl = data.url;
		}

		await prisma.profile.update({
			where: {
				id: user_id
			},
			data: {
				firstname,
				lastname,
				bio,
				gender,
				...(photoUrl.length > 0 ? { photoUrl } : {}),
				dateOfBirth: new Date(dob)
			}
		});
	}
} satisfies Actions;
