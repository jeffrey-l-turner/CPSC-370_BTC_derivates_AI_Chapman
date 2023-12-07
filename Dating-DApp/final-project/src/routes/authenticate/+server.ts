import { stytch } from '$lib/server/stytch';
import type { RequestHandler } from './$types';
import { redirect, error } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const token = url.searchParams.get('token');
	if (!token) {
		throw error(400);
	}

	try {
		const res = await stytch.magicLinks.authenticate({
			token
		});
		console.log(res);
	} catch (err) {
		console.error(err);
		throw error(500);
	}

	throw redirect(303, '/protected/feed');
};
