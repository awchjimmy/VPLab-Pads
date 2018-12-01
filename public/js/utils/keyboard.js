import { _, bgm } from '../constants.js'
import { audioDrumKick, audioDrumSnr, audioDrumHiHat, audioDrumClap, startPlayback } from '../utils/audio.js'


export let keyloggerArray = []

export const recordKeyboard = (keyCode) => {
    keyloggerArray.push({ key: keyCode, timing: + new Date() })
}


export const replayKeyboard = (keySequence) => {
    // drum kit playback
    _.forEach(keySequence, item => {
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

            console.debug('item timing', item['timing'] - keySequence[0]['timing'])
        }, item['timing'] - keySequence[0]['timing'])
    })

    // output json
    console.log(
        JSON.stringify(
            _.map(keySequence, item => {
                return { key: item['key'], timing: item['timing'] - keySequence[0]['timing'] }
            })
        )
    )
}