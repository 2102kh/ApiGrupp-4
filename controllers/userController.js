const { UserAccount } = require('../models')
const bcrypt = require('bcrypt')

async function onCreateUser(req, res) {
    // sommar123
    const { firstName, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await UserAccount.findOne({
        where: { email }
    });

    if (user) {
        return res.status(401).json({message: "Email already in use"});
    } else {
        await UserAccount.create({
            firstName: firstName,
            email: email,
            password: hashedPassword     
        })
        // Cookien och vem är inloggad ???  ->  req
        return res.status(200).json({ email })
    }
}

async function onLogin(req, res) {
    // 1. ta lösenordet och email från req.body
    // 2. lösenordet bcryptas och jämförs med det i databasen
    // 3. Skapa koppling i session storage
    //   mappa cookie -> useraccount.id

    const { email, password } = req.body;

    const user = await UserAccount.findOne({
        where: { email }
    });
    
    if (!user) {
        return res.status(401).send('Login failed');
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
        return res.status(401).send('Login failed');
    }

    req.session.userId = user.id

    res.json({ status: "Yepp" })
}


module.exports = {
    onCreateUser,
    onLogin
}