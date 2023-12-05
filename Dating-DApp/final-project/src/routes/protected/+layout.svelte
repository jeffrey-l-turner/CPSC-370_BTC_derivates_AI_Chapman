<script lang="ts">
	import { page } from '$app/stores';
	import { Users, ChatBubbleBottomCenter, User } from 'svelte-heros-v2';
	$: console.log($page.url.pathname);

	const routes = [
		{
			icon: Users,
			path: '/protected/feed'
		},
		{
			icon: ChatBubbleBottomCenter,
			path: '/protected/matches'
		},
		{
			icon: User,
			path: '/protected/profile'
		}
	];
</script>

<div class="navbar bg-base-100 border-b">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost text-xl">Dating Dapp</a>
	</div>
</div>

<div class="main p-4">
	<slot />
</div>

<div class="btm-nav h-16 border-t">
	{#each routes as { icon, path }}
		<a href={path} class="text-primary active" class:active={$page.url.pathname === path}>
			<svelte:component this={icon}></svelte:component>
		</a>
	{/each}
</div>

<style>
	.main {
		height: calc(100vh - 124px);
	}
</style>
