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
    try {
        const messages = await usermessages.findAll({
            include: [{ model: UserAccount, attributes: ['firstName'], required: false }]
        });

        const listOfmessages = messages.map((message) => {
            const msgData = message.toJSON();
            const firstName = msgData.UserAccount ? msgData.UserAccount.firstName : null;
            return {
                message: msgData.message,
                firstName: firstName,
                login: req.session.userId == msgData.userid
            };
        });

        res.status(200).json(listOfmessages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    onCreateMessage,
    onGetMessages
};