<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="p-3">
	<h1 class="text-2xl">Profile Setup</h1>

	<form method="POST" class="space-y-5 mt-5" enctype="multipart/form-data">
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">First Name</span>
			</div>
			<input
				value={data.profile?.firstname}
				name="firstname"
				type="text"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
			/>
		</label>

		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">Last Name</span>
			</div>
			<input
				value={data.profile?.lastname}
				name="lastname"
				type="text"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
			/>
		</label>

		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">Gender</span>
			</div>
			<input
				value={data.profile?.gender}
				name="gender"
				type="text"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
			/>
		</label>

		<div class="form-control">
			<div class="label">
				<span class="label-text">Date of birth</span>
			</div>
			<input
				class="w-full border border-gray-300 p-3 rounded-md"
				type="date"
				value={data.profile?.dateOfBirth?.toISOString().substring(0, 10)}
				id="start"
				name="dob"
			/>
		</div>

		{#if data.profile?.photoUrl}
			<img src={data.profile.photoUrl} alt="" />
		{/if}
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">Profile picture</span>
			</div>
			<input name="photo" type="file" class="file-input file-input-bordered w-full max-w-xs" />
		</label>

		<label class="form-control">
			<div class="label">
				<span class="label-text">Bio</span>
			</div>
			<textarea name="bio" class="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
		</label>

		<button class="btn btn-primary w-full"> Update </button>
	</form>
</div>

<style>
	:root {
		--date-input-width: 100%;
	}
</style>
