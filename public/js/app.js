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
let keyloggerArray = []
let bgm = document.querySelector('audio.bgm')

// animation part
let tweenDrumKick = () => {
  // let ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 25, 26, 38, 39, 51, 52, 64, 65, 77, 78, 90, 91, 92, 93, 94, 95, 96, 97, 97, 98, 99, 100, 101, 102, 103]
  let ids = _.range(104)

  ids.forEach(id => {
    pixels[id].l = 50
    createjs.Tween.get(pixels[id]).to({ l: LIGHTNESS_MIN }, 700)
  })
}
tweenDrumKick()

let tweenDrumSnr = () => {
  // let ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 25, 26, 38, 39, 51, 52, 64, 65, 77, 78, 90, 91, 92, 93, 94, 95, 96, 97, 97, 98, 99, 100, 101, 102, 103]
  let ids = _.concat(_.range(0, 26), _.range(78, 104), [26, 27, 50, 51, 52, 53, 76, 77, 78, 79, 37, 38, 39, 40, 63, 64, 65, 66])
  console.debug(ids)

  ids.forEach(id => {
    pixels[id].l = 50
    createjs.Tween.get(pixels[id]).to({ l: LIGHTNESS_MIN }, 700)
  })
}

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

let audioDrumKick = () => {
  let audio = document.querySelector('.drum-kit')
  console.debug(audio)
  audio.src = 'assets/CYCdh_ElecK03-Kick02.mp3'
  audio.currentTime = 0
  audio.play()
}

let audioDrumSnr = () => {
  let audio = document.querySelector('.drum-kit')
  console.debug(audio)
  audio.src = 'assets/CYCdh_K2room_Snr-03.mp3'
  audio.currentTime = 0
  audio.play()
}

let recordKeyboard = (keyCode) => {
  keyloggerArray.push({ key: keyCode, timing: + new Date() })
}

let debugDisplayKeyboardTiming = () => {
  console.debug('keylogger Array:')
  console.debug(_.map(keyloggerArray, item => {
    return { key: item['key'], timing: item['timing'] - keyloggerArray[0]['timing'] }
  }
  ))
}

let startBackgroundMusic = () => {
  bgm.currentTime = 0
  bgm.play()
}

let playbackKeyboardTiming = () => {
  // bgm playback
  startBackgroundMusic()

  // drum kit playback
  _.forEach(keyloggerArray, item => {
    setTimeout(() => {
      switch (item['key']) {
        case 65: // A
          trigger_A()
          break
        case 83: // S
          trigger_S()
        default:
          break
      }
      console.debug('item timing', item['timing'] - keyloggerArray[0]['timing'])
    }, item['timing'] - keyloggerArray[0]['timing'])
  })

  // output json
  console.log(
    JSON.stringify(
      _.map(keyloggerArray, item => {
        return { key: item['key'], timing: item['timing'] - keyloggerArray[0]['timing'] }
      })
    )
  )
}

let trigger_A = () => {
  socket.emit('userInterface', '[Bass Drum] (A)')
  tweenDrumKick()
  audioDrumKick()
}

let trigger_S = () => {
  socket.emit('userInterface', '[Snare] (S)')
  tweenDrumSnr()
  audioDrumSnr()
  console.debug('trigger S')
}

// keyboard event
window.addEventListener('keydown', (e) => {
  // alert(e.keyCode)
  switch (e.keyCode) {
    case 65: // A
      trigger_A()
      break
    case 83: // S
      trigger_S()
      break
    case 68: // D
      break
    case 70: // F
      break
    case 80: // P print keyloggerArray
      debugDisplayKeyboardTiming()
      playbackKeyboardTiming()
      break;
    case 81: // Q bgm start
      startBackgroundMusic()
    default:
      console.debug(e.keyCode)
      break
  }
  recordKeyboard(e.keyCode)
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
