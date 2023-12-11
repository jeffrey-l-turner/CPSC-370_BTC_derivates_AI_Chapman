<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<form method="POST" class="p-3 space-y-5">
	<h1 class="text-2xl">Filters</h1>

	<p>Interested in...</p>
	<div class="form-control">
		<label class="label cursor-pointer justify-start gap-3">
			<input
				type="radio"
				name="interestedIn"
				value="male"
				checked={data.profile?.interestedIn === 'male'}
				class="radio radio-sm"
			/>
			<span class="label-text">Male</span>
		</label>
	</div>
	<div class="form-control">
		<label class="label cursor-pointer justify-start gap-3">
			<input
				type="radio"
				name="interestedIn"
				value="female"
				checked={data.profile?.interestedIn === 'female'}
				class="radio radio-sm"
			/>
			<span class="label-text">Female</span>
		</label>
	</div>
	<div class="form-control">
		<label class="label cursor-pointer justify-start gap-3">
			<input
				type="radio"
				name="interestedIn"
				value="other"
				checked={data.profile?.interestedIn === 'other'}
				class="radio radio-sm"
			/>
			<span class="label-text">Other</span>
		</label>
	</div>

	<button class="btn btn-primary w-full"> Update </button>
</form>
