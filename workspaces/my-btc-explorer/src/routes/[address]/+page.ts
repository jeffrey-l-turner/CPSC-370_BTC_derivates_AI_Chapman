import type { PageLoad } from './$types';
import { trpc } from '$lib/trpc/client';

export const load: PageLoad = async (event) => ({
	address: trpc(event).address.query({ address: event.params.address })
});
