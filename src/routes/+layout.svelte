<script lang="ts">
  import './global.scss'
  import { dev } from '$app/environment'
  import { inject } from '@vercel/analytics'
  import Search from '$lib/nav/Search.svelte'

  export let data
  const { searchData } = data

  inject({ mode: dev ? 'development' : 'production' })
</script>

<nav class="grid">
  <div>something</div>
  <Search {searchData} />
  <div>something else</div>
</nav>

<div class="content">
  <slot />
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    justify-items: center;
    align-items: center;
  }

  nav {
    background: hsl(0, 0%, 16%);
    color: #fff;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 420;
    height: 3.5rem;
  }
  .content {
    margin-top: 3.5rem;
  }
</style>
