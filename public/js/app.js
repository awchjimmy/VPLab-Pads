const TOTAL_LEDS = 104
const FPS = 60
const LIGHTNESS_MIN = 0

// socket.io
let socket = io()

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
pixels = []
_.range(TOTAL_LEDS).forEach(id => {
  d = new Pixel(id)
  pixels.push(d)
})

// animation part
let tweenDrumKick = () => {
  let ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 25, 26, 38, 39, 51, 52, 64, 65, 77, 78, 90, 91, 92, 93, 94, 95, 96, 97, 97, 98, 99, 100, 101, 102, 103]

  ids.forEach(id => {
    pixels[id].l = 50
    createjs.Tween.get(pixels[id]).to({ l: LIGHTNESS_MIN }, 700)
  })
}
tweenDrumKick()

let tweenGlobalHueChanged = () => {
  pixels.forEach((pixel) => {
    createjs.Tween.get(pixel, { loop: true, bounce: true }).to({ h: 0 }, 14000)
  })
}
tweenGlobalHueChanged()

let tweenHeart = () => {
  let ids = [45, 31, 30, 42, 55, 69, 83, 84, 85, 73, 61, 48, 34, 33, 43, 44, 46, 47, 56, 57, 58, 59, 60, 70, 71, 72]
  ids.forEach(id => {
    pixels[id].l = 50
  })
}
// tweenHeart()

let tweenIdle = () => {
  let ids = [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 27, 37, 40, 50, 53, 63, 66, 76, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89]
  ids.forEach(id => {
    pixels[id].l = _.random(30, 50)
    createjs.Tween.get(pixels[id], { loop: true }).to({ l: LIGHTNESS_MIN }, _.random(1000, 3000))
  })
}
// tweenIdle()

// keyboard event
window.addEventListener('keydown', (e) => {
  // alert(e.keyCode)
  switch (e.keyCode) {
    case 65: // A
      socket.emit('userInterface', '[Bass Drum] (A)')
      tweenDrumKick()
      break
    default:
      break
  }
})

// web simulator
let display = () => {
  setInterval(() => {
    d3
      .selectAll("div.pixel")
      .data(pixels)
      .style("background-color", ({ h, s, l }) => {
        return `hsl(${h}, ${s}%, ${l}%)`
      })
    socket.emit('hslPixelsToBackend', pixels)
  }, 1000 / FPS)
}
display()
