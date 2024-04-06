<script lang="ts">
	import LogoLeadButton from '$lib/components/LogoLeadButton.svelte';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import ProfileImage from '$lib/components/ProfileImage.svelte';
	import { db, storage, user, userData } from '$lib/firebase';
	import { doc, updateDoc } from 'firebase/firestore';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
	import 'iconify-icon';
	import NextStepButton from '$lib/components/NextStepButton.svelte';

	let previewURL: string;
	let uploading = false;
	let uploaded = false;
	let file: any;
	$: href = `/${$userData?.username}/edit`;

	function setFile(e: any) {
		file = e.target.files[0];
	}

	async function upload() {
		uploading = true;
		previewURL = URL.createObjectURL(file);
		const storageRef = ref(storage, `users/${$user!.uid}/profile.png`);
		const result = await uploadBytes(storageRef, file);
		const url = await getDownloadURL(result.ref);

		await updateDoc(doc(db, 'users', $user!.uid), { photoURL: url });
		uploading = false;
		uploaded = true;
	}
</script>

<AuthCheck>
	<h2 class="card-title">Upload a Profile Photo</h2>

	<form class="w-full max-w-screen-md" on:submit|preventDefault={upload}>
		<div class="form-control mx-auto my-10 w-full max-w-xs text-center">
			{#if previewURL || $userData?.photoURL}
				<ProfileImage url={previewURL ?? $userData?.photoURL} />
			{:else}
				<iconify-icon class="mx-auto" width="256" height="256" icon="iconamoon:profile">
				</iconify-icon>
			{/if}
			<label for="photoURL" class="label">
				<span class="label-text">Pick a file</span>
			</label>
			<input
				on:change={setFile}
				name="photoURL"
				type="file"
				class="file-input file-input-bordered w-full max-w-xs"
				accept="image/png, image/jpeg, image/gif, image/webp"
			/>

			<!-- {#if uploading} -->
			<div class="mt-3 flex w-full flex-col justify-center">
				<p>Uploading...</p>
				<progress class="progress progress-info mt-2 w-full" />
			</div>
			<!-- {/if} -->
			<div class="mt-6 flex w-full items-center justify-between">
				<LogoLeadButton
					icon="material-symbols:upload"
					label="UPLOAD"
					disabled={uploading || !file}
				/>
				<NextStepButton
					label={uploaded ? 'FINISH' : 'SKIP'}
					path={href}
					secondary={!uploaded}
					disabled={uploading}
				/>
			</div>
		</div>
	</form>
</AuthCheck>
