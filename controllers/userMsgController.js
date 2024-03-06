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
    const listOfmessages = messages.map((value) => {
        if (req.session.userId == value.dataValues.userid) {

            value.dataValues.login = true
        } else {
            value.dataValues.login = false

        }
        return value.dataValues;
    })


    for (const user of users) {
        const updatedList = listOfmessages.map((value) => {
            if (user.dataValues.id == value.userid) {
                value.firstname = user.dataValues.firstName



            }
            return value

        })
        return updatedList
    }


}



module.exports = {
    onCreateMessage,
    onGetMessages
}