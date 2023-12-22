<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="p-3">
	<h1 class="text-2xl">Karma</h1>
	<p class="text-xl flex">Score: $0.15</p>

	<h1 class="text-xl mt-8">Recent data:</h1>
	<ul class="space-y-2">
		<li>+ $0.10: Verifying Profile</li>
		<li>+ $0.50: Positive User Review</li>
		<li>+ $0.50: Positive User Review</li>
		<li>+ $0.10: Positive Meet-up</li>
	</ul>

	<h1 class="text-xl mt-8">Read the</h1>
	<p class="py-4">Community Guidelines ➭</p>

	<div class="flex justify-center">
		<button class="btn btn-primary w-full">Donate to the Project</button>
	</div>
</div>
