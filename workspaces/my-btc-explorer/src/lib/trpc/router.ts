import type { Context } from '$lib/trpc/context';
import { z } from 'zod';
import { initTRPC } from '@trpc/server';

export const t = initTRPC.context<Context>().create();

function delay(delayInMilliseconds: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, delayInMilliseconds);
	});
}

export const router = t.router({
	greeting: t.procedure.query(async () => {
		await delay(500); // 👈 simulate an expensive operation
		return `Hello tRPC v10 @ ${new Date().toLocaleTimeString()}`;
	}),
	address: t.procedure
		.input(
			z.object({
				address: z.string()
			})
		)
		.query(async (options) => {
			const response = await fetch(`https://blockchain.info/rawaddr/${options.input.address}`);
			return await response.json();
		})
});

export type Router = typeof router;
