<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
	$: console.log(form);
</script>

<div class="grid h-screen bg-primary">
	<div class="card bg-base-100 place-self-center w-full max-w-md">
		<form method="POST" class="card-body">
			<h2 class="card-title">Sign up</h2>
			<p>
				Already have an account?
				<a href="/signin" class="text-primary"> Sign in </a>
			</p>

			<input
				type="text"
				name="email"
				placeholder="Type here"
				class="input input-bordered w-full mt-5"
			/>

			<button class="mt-2 btn btn-primary"> Sign up </button>

			{#if form?.success}
				<div role="alert" class="alert">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="stroke-info shrink-0 w-6 h-6"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						></path></svg
					>
					<span>Email successfully sent...</span>
				</div>
			{/if}
		</form>
	</div>
</div>
