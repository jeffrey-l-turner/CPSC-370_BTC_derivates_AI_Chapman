<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<!--
	Add in stytch data
	Add in sveltekit actions to edit data
-->
<h1 class="text-2xl">My profile</h1>

<div class="space-y-3 mt-5">
	<input type="file" class="file-input file-input-sm file-input-bordered w-full" />

	<textarea class="textarea textarea-bordered w-full" placeholder="Bio"></textarea>
</div>
