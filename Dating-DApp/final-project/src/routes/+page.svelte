<script lang="ts">
  import  Version  from "$lib/index.ts";
</script>

{Version}
<div class="flex flex-col h-screen">
	<div class="navbar bg-base-100 p-4 border-b">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost text-xl">Chapman Dating Dapp</a>
		</div>

		<div class="navbar-end space-x-3 hidden md:flex">
			<a class="btn btn-accent" href="/signin">Sign in</a>
			<a class="btn btn-primary items-center" href="/signin">Sign up</a>
		</div>
	</div>

	<div class="container mx-auto pt-8 px-3 md:pt-48 gap-5">
		<div class="flex flex-col md:flex-row justify-between">
			<div class="md:w-1/2">
				<h1 class="text-3xl md:text-4xl leading-snug font-bold">
					Welcome to the new Chapman Dating Dapp
				</h1>
				<h2 class="text-xl md:text-2xl mt-4">
					Connect with others on campus using an application made by students, for students
				</h2>
				<div class="space-x-3 mt-10">
					<a class="btn btn-primary items-center" href="/signin">Sign up for free</a>
					<a class="btn items-center" href="/signin">Learn more</a>
				</div>
			</div>
			<div class="md:w-1/3 mt-5">
				<img src="/landing.svg" alt="" />
			</div>
		</div>
	</div>
</div>
