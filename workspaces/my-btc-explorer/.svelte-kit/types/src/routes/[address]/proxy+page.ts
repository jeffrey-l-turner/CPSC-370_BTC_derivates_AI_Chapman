// @ts-nocheck
import type { PageLoad } from './$types';
import { trpc } from '$lib/trpc/client';

export const load = async (event: Parameters<PageLoad>[0]) => ({
	address: trpc(event).address.query({ address: event.params.address })
});
