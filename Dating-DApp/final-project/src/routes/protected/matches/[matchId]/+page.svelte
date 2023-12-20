<script lang="ts">
	import { enhance } from '$app/forms';
	import { PaperAirplane } from 'svelte-heros-v2';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex flex-col messages">
	<div class="p-3 flex-1">
		{#each data.messages as { senderId, message, sentAt }}
			<div class="chat {senderId == data.user_id ? 'chat-end' : 'chat-start'}">
				<div class="chat-image avatar">
					<div class="w-10 rounded-full">
						<img
							alt="Tailwind CSS chat bubble component"
							src={senderId == data.user_id ? data.profile?.photoUrl : data.other?.photoUrl}
						/>
					</div>
				</div>
				<div class="chat-header">
					{senderId == data.user_id ? data.profile?.firstname : data.other?.firstname}
					<time class="text-xs opacity-50">{sentAt.toLocaleTimeString()}</time>
				</div>
				<div class="chat-bubble">{message}</div>
			</div>
		{/each}
	</div>
	<div class="border-t w-screen pb-2">
		<form use:enhance method="POST" class="flex items-center mt-2">
			<input
				name="message"
				type="text"
				class="writer input rounded-none w-full"
				placeholder="Type your message..."
			/>
			<button class="btn btn-ghost ml-2" type="submit"> <PaperAirplane></PaperAirplane> </button>
		</form>
	</div>
</div>

<style>
	.messages {
		height: calc(100vh - 65px);
	}
	.writer:focus {
		outline: none;
		border: none;
	}
</style>
