const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const _ = require('lodash')
const convert = require('color-convert')
const dgram = require('dgram')

app.set('view engine', 'pug')
app.use(express.static('public'))

// config
const port = 3000
// const udpHost = '192.168.43.198'
const udpHost = '192.168.0.3'
const udpPort = '7777'
const udpClient = dgram.createSocket('udp4')

app.get('/', (req, res) => {
  res.render('index', {})
})

io.on('connection', (ws) => {
  console.log('a user connected')

  ws.on('disconnect', () => {
    console.log('user disconnected')
  })

  ws.on('userInterface', (eventName) => {
    console.log(eventName)
  })

  ws.on('hslPixelsToBackend', (hslPixels) => {
    //// convert hslPixels to rgbPixels
    let rgbPixels = hslPixels2rgbPixels(hslPixels)

    //// convert rgbPixels to serialized array
    let buff = rgbPixels2SerializedArray(rgbPixels)

    // send array data to nodemcu using raw socket
    udpClient.send(buff, udpPort, udpHost)
  })
})

http.listen(port, () => {
  console.log(`server listening on port ${port}`)
})

let hslPixels2rgbPixels = (hslPixels) => {
  // console.log(hslPixels[0])
  let rgbPixels = []
  _.forEach(hslPixels, (hslPixel) => {
    let rgbPixel = {}
    let rgb = convert.hsl.rgb(hslPixel.h, hslPixel.s, hslPixel.l)
    rgbPixel.id = hslPixel.id
    rgbPixel.r = rgb[0]
    rgbPixel.g = rgb[1]
    rgbPixel.b = rgb[2]
    rgbPixels.push(rgbPixel)
  })
  // console.log(rgbPixels[0])

  return rgbPixels
}

let rgbPixels2SerializedArray = (rgbPixels) => {
  let buff = _.reduce(rgbPixels, (buff, rgbPixel) => {
    let i = rgbPixel.id * 2
    let j = i + 1
    buff[i * 4] = i
    buff[j * 4] = j
    buff[i * 4 + 1] = buff[j * 4 + 1] = rgbPixel.r
    buff[i * 4 + 2] = buff[j * 4 + 2] = rgbPixel.g
    buff[i * 4 + 3] = buff[j * 4 + 3] = rgbPixel.b
    return buff
  }, new Uint8Array(rgbPixels.length * 8))
  // console.log(buff)

  return buff
}