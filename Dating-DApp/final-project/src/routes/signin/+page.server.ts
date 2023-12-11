import { dev } from '$app/environment';
import { stytch } from '$lib/server/stytch';
import { fail, type Actions } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const submission = await request.formData();
		const email = submission.get('email');

		if (typeof email != 'string') {
			return fail(400);
		}

		try {
			await stytch.magicLinks.email.loginOrCreate({
				email,
				login_magic_link_url: dev
					? 'http://localhost:5173/authenticate'
					: 'https://www.btcdapp.dating/authenticate',
				signup_magic_link_url: dev
					? 'http://localhost:5173/authenticate?signup=true'
					: 'https://www.btcdapp.dating/authenticate?signup=true'
			});
		} catch (err) {
			console.error(err);
			return fail(500, { error: true, err });
		}

		return {
			success: true
		};
	}
} satisfies Actions;
