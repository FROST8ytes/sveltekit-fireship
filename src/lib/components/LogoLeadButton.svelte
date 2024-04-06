<script lang="ts">
	export let icon: string;
	export let label: string;
	export let disabled = false;
</script>

<button class="btn btn-success max-w-full" class:btn-disabled={disabled}>
	<div class="flex w-full items-center">
		<iconify-icon class="text-2xl" {icon}></iconify-icon>
		{label}
	</div>
</button>
