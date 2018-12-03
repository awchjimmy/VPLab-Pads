import { pixels } from '../utils/buffer.js'

export const tweenGlobalHueChange = () => {
    pixels.forEach((pixel) => {
        createjs.Tween.get(pixel, { loop: true, bounce: true }).to({ h: 0 }, 7000)
    })
}