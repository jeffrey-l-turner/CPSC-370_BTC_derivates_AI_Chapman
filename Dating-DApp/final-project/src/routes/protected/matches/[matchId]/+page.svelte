<script>
	import { PaperAirplane } from 'svelte-heros-v2';
</script>

<div class="flex flex-col h-screen">
	<div class="p-3">
		<div class="chat chat-start">
			<div class="chat-image avatar">
				<div class="w-10 rounded-full">
					<img
						alt="Tailwind CSS chat bubble component"
						src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
					/>
				</div>
			</div>
			<div class="chat-header">
				Obi-Wan Kenobi
				<time class="text-xs opacity-50">12:45</time>
			</div>
			<div class="chat-bubble">You were the Chosen One!</div>
			<div class="chat-footer opacity-50">Delivered</div>
		</div>
		<div class="chat chat-end">
			<div class="chat-image avatar">
				<div class="w-10 rounded-full">
					<img
						alt="Tailwind CSS chat bubble component"
						src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
					/>
				</div>
			</div>
			<div class="chat-header">
				Anakin
				<time class="text-xs opacity-50">12:46</time>
			</div>
			<div class="chat-bubble">I hate you!</div>
			<div class="chat-footer opacity-50">Delivered</div>
		</div>
	</div>
	<div class="mt-4 border-t place-self-end">
		<form class="flex items-center mt-2">
			<input
				type="text"
				class="writer input rounded-none w-full"
				placeholder="Type your message..."
			/>
			<button class="btn btn-ghost ml-2" type="submit"> <PaperAirplane></PaperAirplane> </button>
		</form>
	</div>
</div>

<style>
	.writer:focus {
		outline: none;
		border: none;
	}
</style>
