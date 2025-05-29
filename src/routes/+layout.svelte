<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<h1>Legends of Runeterra</h1>

<div id="links">
    <h2>Links</h2>
    <p><a href="/">Home</a></p>
    <p><a href="/path-of-champions">Path of Champions</a></p>
</div>

{@render children()}
