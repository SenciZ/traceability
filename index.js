const express = require('express');
const path = require('path')

const app = express()


app.use(express.json())

// include and initialize the rollbar library with your access token
const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: 'b516d03090d2426fa061ee5de43b5b55',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
// rollbar.log('Hello world!')

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully.')
    rollbar.warning('Too many looks!')
})

// app.get('/', (req, res)=>{
//     res.sendFile(path.join(__dirname, '/public/index.html'))
//     rollbar.log('Your page has been looked at.')
// })

const port = process.env.PORT || 4321

app.listen(port, ()=>{console.log(`Listening on ${port}`)})