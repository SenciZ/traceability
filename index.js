const express = require('express');
const path = require('path')

const app = express()

const itemsList=[
    {name: "This is an item."},{name: "This is another item."}
]

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
    rollbar.critical('Carefull you will get sooo many looks!')

})

app.get('/js', (req, res)=>{
    res.sendFile(path.join(__dirname, './main.js'))
})

app.get('/css', (req, res)=>{
    res.sendFile(path.join(__dirname, './public/style.css'))
})

app.get('/api/items', (req, res)=>{
    rollbar.log('Item list sent.', {author: 'Senad', type: 'Manual Entry'})
    res.status(200).send(itemsList)
})

app.post('/api/items', (req, res)=>{
    newMovie = req.body
    if(!newMovie.name){
        rollbar.critical('Name was not provided', {author: 'Senad', type: 'Manual Entry'})
        res.status(500).send("Need to provide a name")

    } else {
        rollbar.info('Name was added', {author: 'Senad', type: 'Manual Entry'})
        itemsList.push(newMovie)
        res.status(200).send(itemsList)
    }
})





// app.get('/', (req, res)=>{
//     res.sendFile(path.join(__dirname, '/public/index.html'))
//     rollbar.log('Your page has been looked at.')
// })

const port = process.env.PORT || 4321
app.use(rollbar.errorHandler())

app.listen(port, ()=>{console.log(`Listening on ${port}`)})