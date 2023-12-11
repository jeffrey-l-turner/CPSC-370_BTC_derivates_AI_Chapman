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
				swipedProfileId: swipedOn.id,
				liked: true
			})
		});
	};

	function calculateAge(birthDate) {
		const today = new Date();
		const birthDateObj = new Date(birthDate);

		let age = today.getFullYear() - birthDateObj.getFullYear();
		const monthDifference = today.getMonth() - birthDateObj.getMonth();

		// Check if the birthday has not occurred this year
		if (
			monthDifference < 0 ||
			(monthDifference === 0 && today.getDate() < birthDateObj.getDate())
		) {
			age--;
		}

		return age;
	}
</script>

<div use:swipe={{ timeframe: 300, minSwipeDistance: 50, touchAction: 'pan-y' }} on:swipe={handler}>
	<div class="overflow-y-hidden feed">
		{#each data.feed as profile (profile.id)}
			<div
				animate:flip={{ duration: 200 }}
				out:fly={{ x: (() => x)(), duration: 300, opacity: 1 }}
				class="join join-vertical p-2 w-full h-full overflow-y-scroll"
			>
				<div class="h-full join-item max-w-sm">
					<img
						src={profile.photoUrl}
						alt=""
						class="w-full h-full object-cover pointer-events-none"
					/>
				</div>
				<div class=" border p-3 rounded-t-none">
					<div class="text-xl font-bold">
						{profile.firstname}, {calculateAge(profile.dateOfBirth)}
					</div>
					<div class="text-lg text-gray-700 font-medium">
						<p>Based in {profile.city}</p>
						<p class="mt-5">{profile.bio}</p>
					</div>
				</div>
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
