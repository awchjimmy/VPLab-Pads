import { TOTAL_LEDS, LIGHTNESS_MIN } from "../constants.js";
import { pixels } from '../utils/buffer.js'

export const tweenDrumKick = () => {
    for (let id = 0; id < TOTAL_LEDS; id++) {
        pixels[id].l = 50
        createjs.Tween.get(pixels[id]).to({ l: LIGHTNESS_MIN }, 700)
    }
}