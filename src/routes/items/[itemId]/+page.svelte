<script lang="ts">
  import Chart from '$lib/items/chart/Chart.svelte'
  import { itemsStore } from '$lib/items/itemsStore.js'
  export let data
  $: itemsStore.setPrices(data.priceData)
</script>

<Chart />
