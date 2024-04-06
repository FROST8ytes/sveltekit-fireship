<script lang="ts">
	import ProfileImage from '$lib/components/ProfileImage.svelte';
	import type { PageData } from './$types';
	import 'iconify-icon';

	export let data: PageData;
</script>

<svelte:head>
	<title>@{data.username} Links</title>
	<meta name="description" content={data.bio} />
</svelte:head>

<main class="prose mx-auto mt-8 text-center">
	<h1 class="mb-6 text-5xl text-purple-500">
		@{data.username}
	</h1>

	{#if data.photoURL}
		<ProfileImage url={data.photoURL} />
	{:else}
		<iconify-icon class="mx-auto" width="256" height="256" icon="iconamoon:profile"> </iconify-icon>
	{/if}

	<p class="my-8 text-xl">{data.bio ?? 'no bio yet...'}</p>
	<ul class="list-none">
		{#each data.links as item}
			{@debug item}
		{/each}
	</ul>
</main>
