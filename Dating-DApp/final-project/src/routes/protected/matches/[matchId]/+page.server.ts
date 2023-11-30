import type { PageServerLoad } from './$types';

export const load = (async ({ params: { matchId } }) => {
	// get the match
	return {};
}) satisfies PageServerLoad;
