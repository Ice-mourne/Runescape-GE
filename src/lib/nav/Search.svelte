<script lang="ts">
  import type { SearchData } from '$lib/types'

  export let searchData: SearchData[]

  let value = ''
  $: filteredData =
    value === '' ? [] : searchData.filter((item) => item[1].toLocaleLowerCase().includes(value.toLocaleLowerCase()))
</script>

<form>
  <input type="search" on:input={(e) => (value = e.currentTarget.value)} />
  <ul>
    {#each filteredData.slice(0, 10) as item}
      <li>
        <a href={'/items/' + item[0]}>{item[1]}</a>
        {#if item[2]}
          m
        {/if}
      </li>
    {/each}
  </ul>
</form>

<style lang="scss">
  input {
    width: 15rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    &:focus {
      outline: none;
    }
  }
  ul {
    width: 15rem;
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 0;
    position: absolute;
  }
  li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 0 0 0.25rem 0.25rem;
    &:hover {
      background-color: #ccc;
    }
    padding-top: 0.25rem;
  }
  a {
    color: blanchedalmond;
    &:visited {
      color: blanchedalmond;
    }
    text-decoration: none;
  }
</style>
