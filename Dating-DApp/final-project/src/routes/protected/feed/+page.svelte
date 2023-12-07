<script lang="ts">
	import { fly } from 'svelte/transition';
	import { swipe } from 'svelte-gestures';
	import { flip } from 'svelte/animate';
	import type { PageData } from './$types';

	export let data: PageData;
	$: console.log(data);

	let x = 500;
	const handler = async (event) => {
		x = event.detail.direction === 'right' ? 500 : -500;
		const swipedOn = data.feed[0];
		data.feed = data.feed.slice(1);

		await fetch('/protected/feed', {
			method: 'POST',
			headers: {
				'x-sveltekit-action': 'true'
			},
			body: JSON.stringify({
				id: swipedOn.id
			})
		});
	};
</script>

<div use:swipe={{ timeframe: 300, minSwipeDistance: 50, touchAction: 'pan-y' }} on:swipe={handler}>
	<div class="overflow-y-hidden feed">
		8
		{#each data.feed as profile (profile.id)}
			<div
				animate:flip={{ duration: 200 }}
				out:fly={{ x: (() => x)(), duration: 300, opacity: 1 }}
				class="join join-vertical p-2 w-full h-full"
			>
				<div class="h-full join-item max-w-sm">
					<img
						src={profile.photoUrl}
						alt=""
						class="w-full h-full object-cover pointer-events-none"
					/>
				</div>
				<details class="collapse border join-item bg-white" open>
					<summary class="collapse-title w-full text-xl font-medium pe-3">
						<div class="flex items-center justify-between">
							{profile.firstname}, {profile.dateOfBirth}
						</div>
					</summary>
					<div class="collapse-content">
						<p>content</p>
					</div>
				</details>
			</div>
		{/each}
	</div>
</div>

<style>
	img {
		height: calc(100vh - 150px);
	}
	.feed {
		height: calc(100vh - 65px);
	}
</style>
