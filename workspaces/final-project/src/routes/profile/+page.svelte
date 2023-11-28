<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<!--
	Add in stytch data
	Add in sveltekit actions to edit data
-->
<h1>{data.name}</h1>
