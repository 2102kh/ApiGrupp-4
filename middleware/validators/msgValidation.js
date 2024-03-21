const { check, validationResult } = require('express-validator');

const validateMsg = [
    check('message')
        .escape()
        .trim()
        .not()
        .isEmpty()
        .withMessage('Msg empty'),


    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];

module.exports = {
    //validateLoginUser,
    validateMsg
}