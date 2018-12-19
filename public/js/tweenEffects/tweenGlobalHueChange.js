import { pixels } from '../utils/buffer.js'

let globalHue = 256

export const tweenGlobalHueChange = () => {
    pixels.forEach((pixel) => {
        createjs.Tween.get(pixel, { loop: true, bounce: true }).to({ h: 0 }, 7000)
    })
}

export const registerTweenGlobalHueChange = () => {
    handleHueChange()
    setInterval(handleHueChange, 1000)
}

const handleHueChange = () => {
    pixels.forEach((pixel) => {
        createjs.Tween.get(pixel)
            .to({ h: 0 }, 7000)
            .to({ h: 100 }, 7000)
    })
}