<script lang="ts">
  import Bar from '$lib/items/chart/AnimatedPath.svelte'

  let d = 'M 0 0, 0 50'
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<svg viewBox={`0 0 100 100`} xmlns="http://www.w3.org/2000/svg" width="1000" height="1010">
  <Bar initial="M 0 0, 0 0" {d} />
</svg>

<input type="text" bind:value={d} />
