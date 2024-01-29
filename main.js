const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000 // "Radiofrekvens"


const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors())


const users = [
    {
        username: "Waw",
        password: "waw123",
        id: "324"
    },
    {
        username: "Tag",
        password: "tag123",
        id: "321"
    }
]



app.get('/api/users/:anvId', (req, res) => {
    console.log(req.params.anvId)
    let p = users.find(user => user.id == req.params.anvId)
    // 404???
    if (p == undefined) {
        res.status(404).send('Finns inte')
    }
    res.json(p)
});

app.listen(port, (req, res) => {
    console.log('Listening')
})
app.listen(port, () => {
    console.log(`Example app listening2 on port ${port}`)
})
