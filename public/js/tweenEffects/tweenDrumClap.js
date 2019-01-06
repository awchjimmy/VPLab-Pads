import { _ } from '../constants.js'
import { tweenRunningLights } from '../tweenEffects/tweenRunningLights.js'

export const tweenDrumClap = () => {
    tweenRunningLights(_.range(12, -1))
    tweenRunningLights(_.range(13, 26))
    tweenRunningLights(_.range(39, 25))
    tweenRunningLights(_.range(40, 52))
    tweenRunningLights(_.range(65, 51))
    tweenRunningLights(_.range(65, 78))
    tweenRunningLights(_.range(91, 77))
    tweenRunningLights(_.range(91, 104))
}