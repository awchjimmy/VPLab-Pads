import { pixels } from '../utils/buffer.js'


/*Allen Code */
export const tweenBreath = (id, period, h, s, l) => {
    pixels[id].h = h
    pixels[id].s = s
    pixels[id].l = 0

    createjs.Tween.get(pixels[id])
        .to({ l: l }, period)
        .to({ l: 0 }, period)
}
// breath()