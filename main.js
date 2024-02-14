const express = require('express')
const session = require('express-session')
const cors = require('cors')
const app = express()
const port = 3000 // "Radiofrekvens"
const onCreateUser = require('./controllers/userController.js')


const migrationhelper = require('./migrationhelper')


const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors())

app.get('/api/users', (req, res) => {
    res.json(users)
})


app.get('/api/users/:anvId', (req, res) => {
    console.log(req.params.anvId)
    let p = users.find(user => user.id == req.params.anvId)
    // 404???
    if (p == undefined) {
        res.status(404).send('Finns inte')
    }
    res.json(p)
});

app.post('/api/users', onCreateUser.onCreateUser)

app.listen(port, async (req, res) => {

    console.log('Listening')
    await migrationhelper.migrate()
})
