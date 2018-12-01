import { drum } from '../constants.js'

export const startPlayback = (mp3Player, mp3Url) => {
    mp3Player.src = mp3Url
    mp3Player.currentTime = 0
    mp3Player.play()
}

export const audioDrumKick = () => { startPlayback(drum, 'assets/CYCdh_Eleck03-Kick02.mp3') }
export const audioDrumSnr = () => { startPlayback(drum, 'assets/CYCdh_K2room_Snr-03.mp3') }
export const audioDrumHiHat = () => { startPlayback(drum, 'assets/CYCdh_ElecK01-ClHat01.mp3') }
export const audioDrumClap = () => { startPlayback(drum, 'assets/CYCdh_ElecK02-Clap01.mp3') }