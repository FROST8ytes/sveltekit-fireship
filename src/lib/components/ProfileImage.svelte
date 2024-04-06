<script lang="ts">
	export let url: string;

	function getLargerGoogleProfileImage(url: string | undefined) {
		if (url?.includes('googleusercontent')) {
			const split_url = url?.split('=s');
			return `${split_url[0]}=s512`;
		}
		return url;
	}
</script>

<div class="avatar">
	<div class="w-64 rounded-3xl">
		<img
			src={getLargerGoogleProfileImage(url)}
			alt="photoURL"
			width="256"
			height="256"
			class="mx-auto"
		/>
	</div>
</div>
