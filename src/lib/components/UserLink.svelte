<script lang="ts">
	import 'iconify-icon';

	export let icon: string;
	export let url: string;
	export let title: string;

	let iconify: string;

	switch (icon) {
		case 'twitter':
			iconify = 'logos:twitter';
			break;
		case 'youtube':
			iconify = 'logos:youtube-icon';
			break;
		case 'tiktok':
			iconify = 'logos:tiktok-icon';
			break;
		case 'linkedin':
			iconify = 'logos:linkedin-icon';
			break;
		case 'github':
			iconify = 'bi:github';
			break;
		default:
			iconify = 'ph:link-bold';
			break;
	}
</script>

<a
	href={url}
	target="_blank"
	class="not-prose stack flex w-full max-w-md items-center justify-center rounded-lg bg-base-300 p-4 text-center no-underline"
>
	<iconify-icon icon={iconify} width="32" height="32" class="w-8"></iconify-icon>
	<span class="text-lg font-bold text-white">{title}</span>
</a>
