<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="p-3">
	<h1 class="text-2xl">Profile Setup</h1>

	<h2 class="text-xl">John Smith</h2>

	<div class="space-y-3 mt-5">
		<div class="card w-96 bg-base-100 shadow-xl rounded-lg flex justify-center items-center">
			<figure class="flex justify-center items-center text-center h-56 w-full bg-gray-200">
				<div class="placeholder">
					<span class="text-lg font-semibold text-gray-700">Upload Image</span>
				</div>
			</figure>
		</div>

		<button class="btn">Confirm Age</button>
		<button class="btn">Confirm Location</button>

		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">Height</span>
			</div>
			<input type="text" placeholder="ex: 5&#39; 2" class="input input-bordered w-full max-w-xs" />
		</label>

		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">Bio:</span>
			</div>
			<input
				type="text"
				placeholder="Enter bio here..."
				class="input input-bordered w-full max-w-xs"
			/>
		</label>

		<div class="card w-full bg-base-100 shadow-xl rounded-lg flex justify-center items-center">
			<figure class="flex justify-center items-center text-center h-56 w-full bg-gray-200">
				<div class="placeholder">
					<span class="text-lg font-semibold text-gray-700">Upload Image</span>
				</div>
			</figure>
		</div>
	</div>
</div>
