import { stytch } from '$lib/server/stytch';
import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/dashboard')) {
		try {
			const { session, session_token } = await stytch.sessions.authenticate({
				session_token: event.cookies.get('session_token'),
				session_duration_minutes: 60
			});
			event.cookies.set('session_token', session_token, { path: '/' });

			event.locals.session = session;
		} catch (error) {
			console.log(error);
			throw redirect(303, '/signin');
		}
	}

	const response = await resolve(event);
	return response;
}) satisfies Handle;
