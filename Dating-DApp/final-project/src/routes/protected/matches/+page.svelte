<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="overflow-x-auto">
	<table class="table">
		<tbody>
			{#each data.matches as { profile }}
				<tr>
					<td>
						<a href="/protected/matches/{profile.id}">
							<div class="flex items-center gap-3">
								<div class="avatar indicator">
									<span class="indicator-item badge badge-success z-1"></span>
									<div class="mask mask-squircle w-12 h-12">
										<img
											src={profile.photoUrl != undefined
												? profile.photoUrl
												: 'https://picsum.photos/id/100/200/300'}
											alt="Avatar Tailwind CSS Component"
										/>
									</div>
								</div>
								<div>
									<div class="font-bold">{profile.firstname}</div>
								</div>
							</div>
						</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
