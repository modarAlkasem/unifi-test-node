const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require("./../models/user");






exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Input invalid!");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error) ;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    try {
        const hashedPass = await bcrypt.hash(password, 15);
        const user = new User({
            name: name,
            email: email,
            password: hashedPass
        });
        await user.save();
        return res.status(201).json({
            message: 'New User registerd Successfully!'

        });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }


}


exports.signin = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Input invalid!");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error) ;
    }
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            const error = new Error("Invalid Email or Password!");
            error.statusCode = 401;
           return next(error) ;

        }
        const isPassValid = await bcrypt.compare(password, user.password);
        if (!isPassValid) {
            const error = new Error("Invalid Email or Password!");
            error.statusCode = 401;
            return next(error) ;
        }
        const token = jwt.sign({
            email: user.email,
            userId: user._id.toString()
        },
            process.env.SECRET_TOKEN,
            {
                expiresIn: '1h'
            }
        );
        res.status(200).json({
            message: 'Signed in Successfully!',
            token: token,
            expiresIn : 3600
        })

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }


}