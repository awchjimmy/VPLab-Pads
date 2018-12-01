import * as lodash from 'https://cdn.jsdelivr.net/npm/lodash-es@4.17.11/lodash.js'

// user-defined constants
export const TOTAL_LEDS = 104
export const FPS = 60
export const LIGHTNESS_MIN = 0

// dom elements
export const drum = document.querySelector('audio.drum-kit')
export const bgm = document.querySelector('audio.bgm')

// es modules
export const _ = lodash
