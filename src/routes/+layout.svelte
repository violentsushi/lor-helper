<script lang="ts">
    import { base } from '$app/paths'
	import '../app.css';

	let { children } = $props();
</script>

<div class="m-1">
    <h1 class="font-bold text-xl">Legends of Runeterra</h1>

    <div id="links">
        <p><a href="{base}/">Home</a></p>
        <p><a href="{base}/path-of-champions">Path of Champions</a></p>
    </div>

    {@render children()}
</div>

<a href="#top" class="fixed bottom-6 right-6 bg-gray-100 text-white p-4 cursor-pointer z-50 rounded-full border-1 hover:bg-gray-300">🔝</a>