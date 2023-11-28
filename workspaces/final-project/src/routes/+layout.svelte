<script>
	import '../app.css';
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost text-xl">myDapp</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			<li><a href="/feed">Feed</a></li>
			<li><a href="/profile">Matches</a></li>
			<li><a href="/profile">Profile</a></li>
		</ul>
	</div>
</div>

<slot />
