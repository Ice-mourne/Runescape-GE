import { tick } from 'svelte'
import type { Action } from 'svelte/action'

type BarAnimationParams = { height: number; time: number; index: number }

const timers: number[] = []
const oldHeights: number[] = []
const updateBardAnimation = async (node: SVGPathElement, { height, time, index }: BarAnimationParams) => {
  if (index === 0) {
    timers.forEach((timer) => clearInterval(timer))
    timers.length = 0
    console.log(`from ${oldHeights[0].toFixed(2)} to ${height.toFixed(2)}`)
  }

  const currentPath = node.getAttribute('d')!
  const currentHeight = parseFloat(currentPath.split(' ')[4])
  const path = currentPath.split(' ').slice(0, 4).join(' ')
  const difference = height - currentHeight

  let value = 0
  timers[index] = setInterval(() => {
    value += (difference / time) * 10
    node.setAttribute('d', `${path} ${value}`)
  }, 1000)

  await tick()

  if (oldHeights[index] === height) return
  if (oldHeights[index] === undefined) oldHeights[index] = 0

  if (height > oldHeights[index]) {
  } else {
  }

  oldHeights[index] = height
}

export const barAnimation: Action<SVGPathElement, BarAnimationParams> = (node, { height, index }) => {
  oldHeights[index] = height
  return {
    update(data) {
      updateBardAnimation(node, data)
    },
    destroy() {
      // the node has been removed from the DOM
    },
  }
}
