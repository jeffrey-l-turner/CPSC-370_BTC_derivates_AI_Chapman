<script lang="ts">
	import { page } from '$app/stores';
	import { Users, ChatBubbleBottomCenter, User, Bars3 } from 'svelte-heros-v2';

	const routes = [
		{
			icon: Users,
			text: 'Feed',
			path: '/protected/feed'
		},
		{
			icon: ChatBubbleBottomCenter,
			text: 'Matches',
			path: '/protected/matches'
		},
		{
			icon: User,
			text: 'Filters',
			path: '/protected/filters'
		},
		{
			icon: User,
			text: 'Karma',
			path: '/protected/karma'
		},
		{
			icon: User,
			text: 'Profile',
			path: '/protected/profile'
		}
	];
</script>

<div class="drawer">
	<input id="my-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<div class="navbar bg-base-100 border-b">
			<div class="flex-1">
				<label for="my-drawer" class="btn btn-ghost drawer-button">
					<Bars3 />
				</label>
			</div>
		</div>
		<main class="overflow-y-scroll">
			<slot />
		</main>
	</div>
	<div class="drawer-side z-10">
		<label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
		<ul class="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
			{#each routes as { text, path }}
				<li>
					<a class:active={$page.url.pathname.startsWith(path)} href={path}>{text}</a>
				</li>
			{/each}

			<div class="mt-auto"></div>

			<li>
				<a class:active={$page.url.pathname.startsWith('/protected/help')} href="/protected/help">
					Help
				</a>
			</li>
			<li>
				<button>Sign out</button>
			</li>
		</ul>
	</div>
</div>
