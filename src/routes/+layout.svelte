<script>
	import '../app.pcss';
	import { user, userData } from '$lib/firebase';

	$user;
	$userData;
</script>

<div class="flex min-h-screen flex-col">
	<slot />
</div>
