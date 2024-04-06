<script lang="ts">
	export let path: string;
	export let label: string;
	export let secondary: boolean = false;
	export let disabled: boolean = false;
</script>

<a class="btn btn-primary" class:btn-warning={secondary} class:btn-disabled={disabled} href={path}>
	{label}
	<iconify-icon class="text-2xl" icon="formkit:submit"></iconify-icon>
</a>
