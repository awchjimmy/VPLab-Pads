import { TOTAL_LEDS } from "../constants.js";


// data definition
class Pixel {
    constructor(id) {
        this.id = id
        this.h = 256
        this.s = 100
        this.l = 30
    }
}

// data initialization
export let pixels = []

export const initPixels = () => {
    pixels = []
    for (let id = 0; id < TOTAL_LEDS; id++) {
        let d = new Pixel(id)
        pixels.push(d)
    }
}