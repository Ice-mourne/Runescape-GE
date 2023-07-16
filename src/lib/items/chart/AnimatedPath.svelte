<script lang="ts">
  import { onMount } from 'svelte'
  export let initial = 'M 0 0, 0 0'
  export let d = 'M 0 0, 0 0'
  export let strokeWidth = 0.5
  export let fill = 'transparent'
  export let stroke = 'white'

  let path: SVGPathElement
  let animate: SVGAnimateElement

  const restart = (d: string) => {
    const currentCss = getComputedStyle(path) as CSSStyleDeclaration & { d: string }
    const currentPath = currentCss.d.replace('path("', '').replace('")', '')

    path.setAttribute('d', d)
    animate.setAttribute('from', currentPath)
    animate.setAttribute('to', d)
    animate.beginElement()
  }

  let loaded = false
  onMount(() => {
    loaded = true
  })

  $: loaded ? restart(d) : null
</script>

<path {stroke} {d} stroke-dasharray="0" stroke-width={strokeWidth} {fill} bind:this={path}>
  <animate attributeName="d" from={initial} to={d} dur="3s" restart="always" bind:this={animate} />
</path>
