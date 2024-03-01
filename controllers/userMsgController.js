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
    // Hämtar alla meddelande från table
    const messages = await usermessages.findAll();
    // "destructure" varje objekt till ny array av objekt
    const listOfmessages = messages.map((value) => {
        return value.dataValues;
    })

    return listOfmessages;
}

module.exports = {
    onCreateMessage,
    onGetMessages
}