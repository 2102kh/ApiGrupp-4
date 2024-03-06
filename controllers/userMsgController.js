const { usermessages, UserAccount } = require('../models');

async function onCreateMessage(req, res) {
    const { message } = req.body;

    await usermessages.create({
        userid: req.session.userId,
        message: message
    })

    res.status(200).json({ status: "yepp" })
}

async function onGetMessages(req, res) {
    // Hämtar alla meddelande från table
    const messages = await usermessages.findAll();
    const users = await UserAccount.findAll();
    // "destructure" varje objekt till ny array av objekt
    const listOfMessages = messages.map((value) => {
        if (req.session.userId == value.dataValues.userid) {

            value.dataValues.login = true
        } else {
            value.dataValues.login = false

        }
        return value.dataValues;
    })


    const updatedList = listOfMessages.map((value) => {
        for (const user of users) {
            if (value.userid == user.id) {
                value.firstname = user.firstName
            }
        }
        return value
    })
    return updatedList

}



module.exports = {
    onCreateMessage,
    onGetMessages
}