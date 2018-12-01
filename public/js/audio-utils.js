export const startPlayback = (mp3Player, mp3Url) => {
    mp3Player.src = mp3Url
    mp3Player.currentTime = 0
    mp3Player.play()
}