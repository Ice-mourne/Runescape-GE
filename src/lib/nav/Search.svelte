<script lang="ts">
  export let searchData: [number, string, boolean][]

  let value = ''
  $: filteredData = value === '' ? [] : searchData.filter((item) => item[1].includes(value))
</script>

<div>
  <input type="search" on:input={(e) => (value = e.currentTarget.value)} />
  <ul>
    {#each filteredData.slice(0, 10) as item}
      <li>{item[1]}</li>
    {/each}
  </ul>
</div>

<style lang="scss">
  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    &:focus {
      outline: none;
    }
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    position: absolute;
  }
  li {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 0.25rem 0.25rem;
    &:hover {
      background-color: #ccc;
    }
  }
</style>
