const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

app.use(cors({
    origin: function(__,callback){
        return callback(null, true)
    }
}))

const pageSize = 100

app.get('/images/:page', (req, res) => {
    fetch('https://jsonplaceholder.typicode.com/photos', {
        method: 'get',
    }).then(data => data.json())
    .then((data) => res.send(data.splice(((req.params.page || 0) * pageSize), pageSize)))
})

app.get('/users', (req, res) => {
    fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'get'
    }).then(data => data.json())
    .then(data => {
        res.send(data.map((user) => ({...user, wins: parseInt(Math.random() * 100, 10)})))
    })
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})