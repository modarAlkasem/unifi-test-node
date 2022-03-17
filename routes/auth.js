const express = require('express');
const { body } = require('express-validator');


const User = require('./../models/user');
const authController = require('./../controllers/auth');

const router = express.Router();

router.post('/signup', [
    body('name').trim().notEmpty()
        .withMessage("This field should not be an empy"),
    body('email').trim().notEmpty()
        .withMessage("This field should not be an empy")
        .isEmail().withMessage('E-Mail is not valid')
        .custom((value, { req }) => {
            return User.findOne({ email: value })
                .then(user => {
                    if (user) {
                        return Promise.reject('email is already taken!')
                    }
                })
        }).normalizeEmail(),
    body('password').trim().notEmpty()
        .withMessage('Password could not be empty')
        .isStrongPassword(
            {
                minLength: 10,
                minLowercase: 1,
                minUppercase: 1,
                minSymbols: 1
            }
        ).withMessage('Password is a weak password!')

], authController.signup);


router.post('/signin', [
    body('email').trim().normalizeEmail(),
    body('password').trim()], authController.signin);

module.exports = router;