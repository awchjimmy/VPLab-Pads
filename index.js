const express = require('express')
const app = express()

app.set('view engine', 'pug')
app.use(express.static('public'))
// config
const port = 3003

app.get('/', (req, res) => {
    res.render('index', {})
})

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})