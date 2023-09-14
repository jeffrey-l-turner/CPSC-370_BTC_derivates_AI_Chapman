import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const response = await fetch(`https://blockchain.info/rawaddr/${params.address}`);
	const address = await response.json();

	return {
		address
	};
};
