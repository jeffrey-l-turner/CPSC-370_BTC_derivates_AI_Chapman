<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{JSON.stringify(data.address)}

<section class="prose p-20 max-w-full">
	<!--
	<h1 class="text-primary">Address: {data.address.address}</h1>
	<h2>Transactions</h2>
	{#each data.address.txs as tx}
		<div class="border mt-2 p-4 overflow-x-scroll">
			<code>
				{JSON.stringify(tx, null, 4)}
			</code>
		</div>
	{/each}
	-->
</section>
