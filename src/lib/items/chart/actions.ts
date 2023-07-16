import type { TradeData } from '$lib/types'
import type { Action } from 'svelte/action'
import { writable } from 'svelte/store'

type HoverDisplayAction = Action<SVGPathElement, { data: TradeData }>

type HoverDisplayStore = {
  average: number
  current: number
  traded: number
  date: string
  status: boolean
}

export const hoverDisplayStore = writable<HoverDisplayStore>({
  average: 0,
  current: 0,
  traded: 0,
  date: '',
  status: false,
})

export const handleHoverDisplay: HoverDisplayAction = (node, { data }) => {
  const enterListener = () => {
    hoverDisplayStore.update((state) => {
      state.average = data.averagePrice
      state.current = data.currentPrice
      state.traded = data.tradedAmount
      state.date = data.date
      state.status = true
      return state
    })
  }
  const leaveListener = () => {
    hoverDisplayStore.update((state) => {
      state.status = false
      return state
    })
  }

  const hoverDisplay = document.getElementById('hoverDisplayContainer') as HTMLDivElement
  const handleMouseMove = (e: MouseEvent) => {
    if (e.clientX + hoverDisplay.getBoundingClientRect().width + 15 > window.innerWidth) {
      hoverDisplay.style.left = `${e.clientX - hoverDisplay.getBoundingClientRect().width - 10}px`
    } else {
      hoverDisplay.style.left = `${e.clientX + 10}px`
    }
    hoverDisplay.style.top = `${e.clientY - hoverDisplay.getBoundingClientRect().height / 2}px`
  }

  node.addEventListener('mouseenter', enterListener)
  node.addEventListener('mouseleave', leaveListener)
  node.addEventListener('mousemove', handleMouseMove)
  return {
    destroy() {
      node.removeEventListener('mouseenter', enterListener)
      node.removeEventListener('mouseleave', leaveListener)
      node.removeEventListener('mousemove', handleMouseMove)
    },
  }
}

// var line = $('#line-1').get(0)
// var len = dist(line.x1.baseVal.value, line.x2.baseVal.value, line.y1.baseVal.value, line.y2.baseVal.value)

// $('#len').text(len)

// function dist(x1, x2, y1, y2) {
//   return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2)
// }
