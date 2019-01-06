import { _, LIGHTNESS_MIN } from "../constants.js";
import { pixels } from '../utils/buffer.js'

export const tweenDrumSnr = () => {
    // let ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 25, 26, 38, 39, 51, 52, 64, 65, 77, 78, 90, 91, 92, 93, 94, 95, 96, 97, 97, 98, 99, 100, 101, 102, 103]
    let ids = _.concat(_.range(0, 26), _.range(78, 104), [26, 27, 50, 51, 52, 53, 76, 77, 78, 79, 37, 38, 39, 40, 63, 64, 65, 66])
    console.debug(ids)
  
    let rnd_h = _.random(0, 360)
    ids.forEach(id => {
      pixels[id].h = rnd_h
      pixels[id].s = 100
      pixels[id].l = 50
      createjs.Tween.get(pixels[id]).to({ l: LIGHTNESS_MIN }, 700)
    })
  }