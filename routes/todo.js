const express = require('express');
const { body } = require('express-validator');


const todoController = require('../controllers/todo');
const isAuth = require('../middlewares/is-auth');

const router = express.Router();

router.post('/todos',[
    body('title').trim().notEmpty()
    .withMessage("Title field should not be an empy")
    .isLength({min : 5})
    .withMessage('Description should be at least 5 characters'),
    body('description').trim().notEmpty()
    .withMessage("Description field should not be an empy")
    .isLength({min : 5})
    .withMessage('Description should be at least 5 characters')
],isAuth,todoController.postTodo)

module.exports = router;