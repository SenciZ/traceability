const express = require('express');
const path = require('path')

const app = express()


app.use(express.json())

const Rollbar = require('rollbar')
const rollbar = new Rollbar({
    accessToken: 'a76e304940794347887cdcb1140d3780',
    captureUncaught: true,
    captureUnhandledRejections: true,
})

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully.')
})

const port = process.env.PORT || 4321

app.listen(port, ()=>{console.log(`Listening on ${port}`)})