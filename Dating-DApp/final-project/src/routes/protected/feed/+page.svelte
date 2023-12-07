<script lang="ts">
	import { fly } from 'svelte/transition';
	import { swipe } from 'svelte-gestures';
	import { flip } from 'svelte/animate';

	let items = [
		{
			src: 'https://picsum.photos/200/300'
		},
		{
			src: 'https://picsum.photos/200/300?random=1'
		}
	];

	let x = 500;
	function handler(event) {
		x = event.detail.direction === 'right' ? 500 : -500;
		items = items.slice(1);
	}
</script>

<div use:swipe={{ timeframe: 300, minSwipeDistance: 50, touchAction: 'pan-y' }} on:swipe={handler}>
	<div class="overflow-y-hidden feed">
		{#each items as item (item.src)}
			<div
				animate:flip={{ duration: 200 }}
				out:fly={{ x: (() => x)(), duration: 300, opacity: 1 }}
				class="join join-vertical p-2 w-full h-full"
			>
				<div class="h-full join-item max-w-sm">
					<img src={item.src} alt="" class="w-full h-full object-cover pointer-events-none" />
				</div>
				<details class="collapse border join-item bg-white" open>
					<summary class="collapse-title w-full text-xl font-medium pe-3">
						<div class="flex items-center justify-between">
							Jane, 28
							<span class="badge">4 miles away</span>
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
