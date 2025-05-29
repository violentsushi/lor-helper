<script lang="ts">
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
</script>

<h2>Path of Champions</h2>

<p>{data.foo}</p>