import { tweenBreath } from './tweenBreath.js'

// Jimmy's Code
// 流水燈 按照 ids 順序亮燈
export const tweenRunningLights = (ids) => {
    for (let idx = 0; idx < ids.length; idx++) {
        setTimeout(() => {
            const id = ids[idx]
            const period = 200
            const h = 0, s = 0, l = 100 // white
            tweenBreath(id, period, h, s, l)
        }, 700 / ids.length * idx)
    }
}