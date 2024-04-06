<script lang="ts">
	import ProfileImage from '$lib/components/ProfileImage.svelte';
	import UserLink from '$lib/components/UserLink.svelte';
	import type { PageData } from './$types';
	import 'iconify-icon';

	export let data: PageData;
</script>

<svelte:head>
	<title>@{data.username} Links</title>
	<meta name="description" content={data.bio} />
</svelte:head>

<main class="prose mx-auto mt-8 text-center">
	<h1 class="mb-6 text-4xl text-purple-500">
		@{data.username}
	</h1>

	{#if data.photoURL}
		<ProfileImage url={data.photoURL} />
	{:else}
		<iconify-icon class="mx-auto" width="256" height="256" icon="iconamoon:profile"> </iconify-icon>
	{/if}

	<p class="my-8 text-xl">{data.bio ?? 'no bio yet...'}</p>
	<ul class="my-12 list-none space-y-3">
		{#each data.links as item}
			<UserLink {...item} />
		{/each}
	</ul>
</main>
