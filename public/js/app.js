import { startPlayback, audioDrumKick, audioDrumSnr, audioDrumHiHat, audioDrumClap } from './utils/audio.js'
import { registerWebSimulator } from './utils/simulator.js'
import { _, TOTAL_LEDS, FPS, LIGHTNESS_MIN, bgm } from './constants.js'
import { coordinateConversion } from './utils/tween.js'
import { pixels, initPixels } from './utils/buffer.js'
import { recordKeyboard, keyloggerArray, replayKeyboard } from './utils/keyboard.js'

// animation effects
import { tweenDrumKick } from './tweenEffects/tweenDrumKick.js'
import { tweenDrumSnr } from './tweenEffects/tweenDrumSnr.js'
import { tweenDrumClap } from './tweenEffects/tweenDrumClap.js'
import { tweenBreath } from './tweenEffects/tweenBreath.js'
import { registerTweenGlobalHueChange, tweenGlobalHueChange } from './tweenEffects/tweenGlobalHueChange.js'
import { tweenRunningLights } from './tweenEffects/tweenRunningLights.js'

// keyboard record playback
import { file0002 } from './file0002.js'

// socket.io
const socket = io()

initPixels()

// animation part
tweenDrumKick()
// tweenGlobalHueChange()



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
        case 49: // 1
          audioDrumKick()
          break
        case 50: // 2
          audioDrumSnr()
          break
        case 51: // 3
          audioDrumHiHat()
          break
        case 52: // 4
          audioDrumClap()
          break
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

let randomFlash = () => {

  for (i = 0; i < 100; i++) {
    id = _.random(0, 104)

    tweenBreath(id, _.random(1000, 5000), _.random(0, 360), 100, _.random(70, 100))
  }
}

// Jimmy's Code
let randomFlash2 = () => {
  let ids = _.range(TOTAL_LEDS)

  _.forEach(ids, id => {
    const interval = _.random(2000, 5000)
    const hue = 56 // yellow
    const saturation = 100
    const lightness = _.random(80, 100)

    tweenBreath(id, interval, hue, saturation, lightness)
  })
}

/*<< Wave Strip Flow >>
  strip: number of the strip number, strip direction from door to in.(0 ~ 7)
  direction = 0/1 1:in to door, 0:door to in
*/
let waveFlowStrip = (strip, direction, period, h = 0, s = 0, l = 100) => {

  let start = strip * 13 + ((strip + direction) % 2) * 12
  let ids = _.range(start, start + 13 * (-1) ** (strip + direction))
  let counter = 0
  console.log(ids)

  ids.forEach(id => {
    setTimeout(() => {
      tweenBreath(id, period, h, s, l)
    }, 50 * counter)

    counter++
  })
}





let firework = (x, y) => {
  // let distance = [13][8]
  let counter = 0
  let distance = {}

  for (let local_x = 1; local_x <= 13; local_x++) {
    for (let local_y = 1; local_y <= 8; local_y++) {
      distance[local_x] = distance[local_x] || {}
      distance[local_x][local_y] = (Math.sqrt((local_x - x) ** 2 + (local_y - y) ** 2))
    }
  }
  console.log(distance)

  for (let local_x = 1; local_x <= 13; local_x++) {
    for (let local_y = 1; local_y <= 8; local_y++) {
      setTimeout(() => {
        let small_x = local_x
        let small_y = local_y

        tweenBreath(coordinateConversion(small_x, small_y), 500, 0, 0, 100)
      }, 200 * distance[local_x][local_y])
    }
  }
}

let beat = (x, y) => {
  // let distance = [13][8]
  counter = 0
  let distance = {}

  for (local_x = 1; local_x <= 13; local_x++) {
    for (local_y = 1; local_y <= 8; local_y++) {
      distance[local_x] = distance[local_x] || {}
      distance[local_x][local_y] = (Math.sqrt((local_x - x) ** 2 + (local_y - y) ** 2))
    }
  }
  console.log(distance)

  for (let local_x = 1; local_x <= 13; local_x++) {
    for (let local_y = 1; local_y <= 8; local_y++) {
      setTimeout(() => {
        let small_x = local_x
        let small_y = local_y

        tweenBreath(coordinateConversion(small_x, small_y), 100, 0, 0, 100)
      }, 100 * distance[local_x][local_y])
    }
  }
}



// keyboard event
window.addEventListener('keydown', (e) => {
  // alert(e.keyCode)
  switch (e.keyCode) {
    case 48:
      // tweenGlobalHueChange()
      break
    case 49: // 1
      audioDrumKick()
      tweenDrumKick()
      break
    case 50: // 2
      audioDrumSnr()
      tweenDrumSnr()
      break
    case 51: // 3
      audioDrumHiHat()
      break
    case 52: // 4
      audioDrumClap()
      tweenDrumClap()
      // tweenRunningLights(_.range(12, -1))
      // tweenRunningLights(_.range(13, 26))
      // tweenRunningLights(_.range(39, 25))
      // tweenRunningLights(_.range(40, 52))
      break
    case 65: // A
      // trigger_A()
      tweenRunningLights([0, 1, 2, 3, 4, 5, 6, 18, 34, 42, 62, 66, 90, 91])
      tweenRunningLights([0, 24, 28, 29, 47, 46, 58, 59, 69, 68, 88, 89, 91])
      tweenRunningLights([0, 25, 26, 50, 53, 76, 80, 100, 99, 98, 97, 96, 95, 94, 93, 92, 91])

      break
    case 66: // B
      startPlayback(bgm, 'assets/0005.mp3')
      break
    case 67: // C
      startPlayback(bgm, 'assets/0003.mp3')
      break
    case 83: // S
      // trigger_S()
      waveFlowStrip(0, 0, 500)
      waveFlowStrip(2, 0, 500)
      waveFlowStrip(4, 0, 500)
      break
    case 68: // D
      randomFlash2()
      break
    case 70: // F
      // breath(2, 2000, 90 , 100 , 50)
      // randomFlash()
      // waveFlowStrip(0, 0, 100, 0, 100, 50)
      firework(13, 8)
      break
    case 80: // P print keyloggerArray
      debugDisplayKeyboardTiming()
      playbackKeyboardTiming()
      break;
    case 81: // Q bgm start
      startBackgroundMusic()
      break
    case 86: // V
      startPlayback(bgm, 'assets/0004.mp3')
      break
    case 87: // W
      startPlayback(bgm, 'assets/0002.mp3')
      replayKeyboard(file0002)
      break
    case 88: // X
      startPlayback(bgm, 'assets/0002.mp3')
      break
    case 90: // Z
      startPlayback(bgm, 'assets/0001.mp3')
      break
    default:
      console.debug(e.keyCode)
      break
  }
  recordKeyboard(e.keyCode)
})

// web simulator
registerWebSimulator(pixels, socket, FPS)