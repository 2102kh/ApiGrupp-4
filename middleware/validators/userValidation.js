const { check, validationResult } = require('express-validator');

const validateCreateUser = [
    check('email')
        .escape()
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Invalid email address!')
        .not()
        .isEmpty()
        .withMessage('Empty  email address!'),
    check('password')
        .escape()
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password can not be empty!')
        .isLength({ min: 8 })
        .withMessage('Minimum 8 characters required!'),
    check('firstName')
        .escape()
        .trim()
        .not()
        .isEmpty()
        .withMessage('Firstname can not be empty!'),
    check('lastName')
        .escape()
        .trim()
        .not()
        .isEmpty()
        .withMessage('Lastname can not be empty!'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];

module.exports = {
    //validateLoginUser,
    validateCreateUser
}