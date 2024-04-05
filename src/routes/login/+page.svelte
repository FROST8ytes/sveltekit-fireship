<script lang="ts">
	import { auth, user } from '$lib/firebase';
	import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
	import 'iconify-icon';

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		const user = await signInWithPopup(auth, provider);
		console.log(user);
	}
</script>

<h2>LOGIN</h2>

{#if $user}
	<h2 class="card-title">Welcome, {$user.displayName}!</h2>
	<p class="text-success text-center">You are logged in.</p>
	<button class="btn btn-warning" on:click={() => signOut(auth)}>
		<iconify-icon icon="uis:signout"></iconify-icon>
		Sign Out
	</button>
{:else}
	<button class="btn btn-primary" on:click={signInWithGoogle}>
		<iconify-icon icon="bi:google"></iconify-icon>
		Sign In with Google
	</button>
{/if}
