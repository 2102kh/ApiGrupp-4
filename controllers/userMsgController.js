const { usermessages } = require('../models');

async function onCreateMessage(req, res) {
    const { message } = req.body;

    await usermessages.create({
        userid: req.session.userId,   
        message: message
    })

    res.status(200).json({ status: "yepp"})
}

async function onGetMessages (req, res) {
    const messages = await usermessages.findAll();
    // FIND ALL MESSAGES AND MAP
    console.log(messages);
    // res.status(201).json({messages})
}


module.exports = {
    onCreateMessage,
    onGetMessages
}