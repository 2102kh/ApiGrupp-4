const express = require('express')
const session = require('express-session')
const cors = require('cors')
const app = express()
const port = 3000 // "Radiofrekvens"
const userController = require('./controllers/userController.js')

const { sequelize, userAccount } = require('./models')

const migrationhelper = require('./migrationhelper')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', '*');
    next();
});

app.use(cors({
    origin: "http://localhost:5500",
    credentials: true,
    // : "http://localhost:5500",


}))



app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true } HTTPS
}));



app.use(express.json())
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

app.post('/api/users', userController.onCreateUser)
app.post('/api/signIn', userController.onLogin);

app.listen(port, async (req, res) => {

    console.log('Listening')
    await migrationhelper.migrate()
})
