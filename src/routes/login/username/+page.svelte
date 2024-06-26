<script lang="ts">
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import LogoLeadButton from '$lib/components/LogoLeadButton.svelte';
	import NextStepButton from '$lib/components/NextStepButton.svelte';
	import { db, user, userData } from '$lib/firebase';
	import { doc, getDoc, writeBatch } from 'firebase/firestore';
	import 'iconify-icon';

	let username = '';
	let loading = false;
	let isAvailable = false;

	let debounceTimer: NodeJS.Timeout;

	const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

	$: isValid = username?.length > 2 && username.length < 16 && re.test(username);
	$: isTouched = username.length > 0;
	$: isTaken = isValid && !isAvailable && !loading;

	async function checkAvailability() {
		isAvailable = false;
		clearTimeout(debounceTimer);

		loading = true;

		debounceTimer = setTimeout(async () => {
			console.log('Checking availability of', username);

			const ref = doc(db, 'usernames', username);
			const exists = await getDoc(ref).then((doc) => doc.exists());

			isAvailable = !exists;
			loading = false;
		}, 500);
	}

	async function confirmUsername() {
		console.log('Confirming username', username);
		const batch = writeBatch(db);
		batch.set(doc(db, 'usernames', username), { uid: $user?.uid });
		batch.set(doc(db, 'users', $user!.uid), {
			username,
			photoURL: $user?.photoURL ?? null,
			published: true,
			bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			links: [
				{
					title: 'Test Link',
					url: 'http://example.com/',
					icon: 'default'
				}
			]
		});

		await batch.commit();
	}
</script>

<AuthCheck>
	{#if $userData?.username}
		<p class="text-center text-success">
			Your username is <span class="font-bold">@{$userData.username}</span>
		</p>
		<p class="text-sm">(Usernames cannot be changed)</p>
		<NextStepButton path="/login/photo" label="UPLOAD PROFILE IMAGE" />
	{:else}
		<form class="sm:w-4/5 lg:w-3/5" on:submit|preventDefault={confirmUsername}>
			<input
				type="text"
				placeholder="Username"
				class="input w-full"
				bind:value={username}
				on:input={checkAvailability}
				class:input-error={!isValid && isTouched}
				class:input-warning={isTaken}
				class:input-success={isAvailable && isValid && !loading}
				class:input-secondary={loading}
			/>

			<div class="my-4 min-h-16 w-full px-8">
				{#if loading}
					<p class="text-secondary">Checking availability of @{username}...</p>
				{/if}

				{#if !isValid && isTouched}
					<p class="text-sm text-error">must be 3-16 characters long, alphanumeric only</p>
				{/if}

				{#if isValid && !isAvailable && !loading}
					<p class="text-sm text-warning">
						@{username} is not available
					</p>
				{/if}

				{#if isAvailable}
					<LogoLeadButton label={`CONFIRM USERNAME @${username}`} icon="line-md:confirm" />
				{/if}
			</div>
		</form>
	{/if}
</AuthCheck>
