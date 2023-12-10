import { prisma } from '$lib/server/prisma';
import { stytch } from '$lib/server/stytch';
import { redirect, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const token = url.searchParams.get('token');
	if (!token) {
		throw error(400);
	}

	let profileData;
	try {
		const res = await stytch.magicLinks.authenticate({
			token,
			session_duration_minutes: 60
		});
		profileData = { email: res.user.emails[0].email, id: res.user_id };

		cookies.set('session_token', res.session_token, { path: '/' });
	} catch (err) {
		console.error(err);
		throw error(500);
	}

	const signup = url.searchParams.get('signup');
	if (signup != null) {
		await prisma.profile.create({
			data: profileData
		});
		throw redirect(303, '/protected/profile');
	}

	throw redirect(303, '/protected/feed');
};
