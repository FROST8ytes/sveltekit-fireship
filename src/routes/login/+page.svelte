<script lang="ts">
	import NextStepButton from '$lib/components/NextStepButton.svelte';
	import { auth, user } from '$lib/firebase';
	import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
	import 'iconify-icon';

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		const credential = await signInWithPopup(auth, provider);

		const idToken = await credential.user.getIdToken();

		const res = await fetch('/api/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
				// 'CSRF-Token': csrfToken // HANDLED by SvelteKit automatically
			},
			body: JSON.stringify({ idToken })
		});
	}

	async function signOutSSR() {
		const res = await fetch('/api/signin', { method: 'DELETE' });
		await signOut(auth);
	}
</script>

{#if $user}
	<h2 class="card-title">Welcome, {$user.displayName}!</h2>
	<p class="text-center text-success">You are logged in.</p>
	<div class="mt-6 flex w-full justify-between">
		<button class="btn btn-warning" on:click={signOutSSR}>
			<iconify-icon class="text-2xl" icon="uis:signout"></iconify-icon>
			SIGN OUT
		</button>
		<NextStepButton path="/login/username" label="SET USERNAME" />
	</div>
{:else}
	<button class="btn btn-primary" on:click={signInWithGoogle}>
		<iconify-icon icon="bi:google"></iconify-icon>
		SIGN IN WITH GOOGLE
	</button>
{/if}
