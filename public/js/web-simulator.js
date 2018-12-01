export const registerWebSimulator = (pixels, socket, fps) => {
    setInterval(() => {
        d3
          .selectAll("div.pixel")
          .data(pixels)
          .style("background-color", ({ h, s, l }) => {
            return `hsl(${h}, ${s}%, ${l}%)`
          })
        socket.emit('hslPixelsToBackend', pixels)
      }, 1000 / fps)
}