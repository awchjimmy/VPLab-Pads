import { _, TOTAL_LEDS, LIGHTNESS_MIN } from "../constants.js";
import { pixels } from '../utils/buffer.js'


export const tweenDrumKick = () => {
    let rnd_h = _.random(0, 360)

    for (let id = 0; id < TOTAL_LEDS; id++) {
        pixels[id].h = rnd_h
        pixels[id].s = 100
        pixels[id].l = 50
        createjs.Tween.get(pixels[id]).to({ l: LIGHTNESS_MIN }, 700)
    }
}