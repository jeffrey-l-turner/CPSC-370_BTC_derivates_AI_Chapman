<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<!--
	Add in stytch data
	Add in sveltekit actions to edit data
-->

<h1 class="px-8 py-12 text-2xl">Karma Score:</h1>
<p class="text-2xl flex justify-center items-center">$0.15</p>

<h1 class="px-8 text-2xl mt-8">Recent data:</h1>
<ul class="px-8 py-4">
	<li>+ $0.10: Verifying Profile</li>
	<li>+ $0.50: Positive User Review</li>
	<li>+ $0.50: Positive User Review</li>
	<li>+ $0.10: Positive Meet-up</li>
</ul>

<h1 class="px-8 text-2xl mt-8">Read the</h1>
<p class="px-8 py-4">Community Guidelines ➭</p>

<div class="flex justify-center">
	<button class="btn btn-primary w-full">Donate to the Project</button>
</div>
