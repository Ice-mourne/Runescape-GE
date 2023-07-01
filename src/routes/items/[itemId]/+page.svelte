<script lang="ts">
  import Chart from '$lib/svg/Chart.svelte'
  export let data
  $: ({ priceData } = data)
</script>

<Chart {priceData} />
