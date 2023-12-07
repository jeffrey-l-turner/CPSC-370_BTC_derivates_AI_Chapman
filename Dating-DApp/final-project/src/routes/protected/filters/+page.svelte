<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let miles = 10;
</script>

<div class="p-3 space-y-5">
	<h1 class="text-2xl">Filters</h1>

	<p>Interested in...</p>
	<div class="form-control">
		<label class="label cursor-pointer justify-start gap-3">
			<input type="checkbox" checked class="checkbox checkbox-sm" />
			<span class="label-text">Men</span>
		</label>
	</div>
	<div class="form-control">
		<label class="label cursor-pointer justify-start gap-3">
			<input type="checkbox" checked class="checkbox checkbox-sm" />
			<span class="label-text">Women</span>
		</label>
	</div>

	<p>Max distance: {miles} miles</p>
	<input type="range" min="0" max="100" bind:value={miles} class="range range-primary" />
</div>
