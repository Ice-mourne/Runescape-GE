// import type { Action } from 'svelte/action'

// type AnimationFunction = (node: SVGPathElement, height: number, offset: number, time: number) => void

// const drawAnimation: AnimationFunction = (node, height, offset, time) => {
//   const totalLength = node.getTotalLength() - offset

//   const timeFraction = (time - (height / 100) * time) / 2

//   // const offsetLength = parseFloat(getComputedStyle(node).strokeDashoffset)
//   // const currentLength = totalLength - offsetLength

//   const keyframes: Keyframe[] = [{ strokeDashoffset: totalLength }, { strokeDashoffset: height }]
//   const options: KeyframeAnimationOptions = {
//     duration: timeFraction + time / 2, // (time * (totalLength - currentLength)) / totalLength
//     easing: 'linear',
//     fill: 'forwards',
//   }

//   // if (activeAnimation) {
//   //   activeAnimation.effect = new KeyframeEffect(node, keyframes, options)
//   //   return
//   // }

//   node.animate(keyframes, options)
// }

// const removeAnimation: AnimationFunction = (node, time, activeAnimation) => {
//   const totalLength = node.getTotalLength()
//   const offsetLength = parseFloat(getComputedStyle(node).strokeDashoffset)

//   const keyframes: Keyframe[] = [{ strokeDashoffset: offsetLength }, { strokeDashoffset: totalLength }]
//   const options: KeyframeAnimationOptions = {
//     duration: (time * (totalLength - offsetLength)) / totalLength,
//     easing: 'linear',
//     fill: 'forwards',
//   }

//   if (activeAnimation) {
//     activeAnimation.effect = new KeyframeEffect(node, keyframes, options)
//     return
//   }

//   node.animate(keyframes, options)
// }

// export const animatePath: Action<
//   SVGPathElement,
//   { height: number; offset: number; time: number; showHide: boolean }
// > = (node, { height, offset, time }) => {
//   node.style.strokeDashoffset = `${height}`
//   drawAnimation(node, height, offset, time)

//   let previous = {
//     height: 0,
//     totalLength: node.getTotalLength(),
//   }

//   return {
//     update({ height, showHide, time }) {
//       console.log(height)

//       const totalLength = node.getTotalLength()
//       const offsetLength = parseFloat(getComputedStyle(node).strokeDashoffset)

//       const currentLength = totalLength - offsetLength

//       node.style.strokeDasharray = `${totalLength}`

//       if (previous.height === height) {
//         // check if show/hide was toggled
//         if (showHide) drawAnimation(node, time)
//         if (!showHide) removeAnimation(node, time)
//         return
//       }

//       const activeAnimations = node.getAnimations().filter((ani) => ani.playState !== 'finished')

//       if (activeAnimations.length > 0) {
//         // if (activeAnimations.length > 1) {
//         //   // cancel all but the last animation
//         //   activeAnimations.slice(0, activeAnimations.length - 1).forEach((ani) => ani.cancel())
//         // }
//         // if (node.getTotalLength() > node.getTotalLength() - parseFloat(getComputedStyle(node).strokeDashoffset)) {
//         //   // needs to go up
//         //   drawAnimation(node, time, activeAnimations[activeAnimations.length - 1])
//         // } else {
//         //   // needs to go down
//         //   removeAnimation(node, time, activeAnimations[activeAnimations.length - 1])
//         // }
//       } else {
//         if (previous.totalLength < node.getTotalLength()) {
//           const newOffset = node.getTotalLength() - previous.totalLength

//           const keyframes: Keyframe[] = [{ strokeDashoffset: newOffset }, { strokeDashoffset: 0 }]
//           const options: KeyframeAnimationOptions = {
//             duration: 5000,
//             easing: 'linear',
//             fill: 'forwards',
//           }

//           node.animate(keyframes, options)

//           // needs to go up
//         } else {
//           const totalLength = node.getTotalLength()
//           const newOffset = previous.totalLength

//           console.log(newOffset, totalLength)

//           const keyframes: Keyframe[] = [{ strokeDashoffset: newOffset }, { strokeDashoffset: totalLength }]
//           const options: KeyframeAnimationOptions = {
//             duration: 5000,
//             easing: 'linear',
//             fill: 'forwards',
//           }

//           // node.animate(keyframes, options)
//         }
//       }

//       previous = {
//         height,
//         totalLength,
//       }
//     },
//     destroy() {},
//   }
// }
