const express = require('express');
const { body, param } = require('express-validator');


const todoController = require('../controllers/todo');
const isAuth = require('../middlewares/is-auth');

const router = express.Router();

router.post('/todos', isAuth, [
    body('title').trim().notEmpty()
        .withMessage("Title field should not be an empy")
        .isLength({ min: 5 })
        .withMessage('Description should be at least 5 characters'),
    body('description').trim().notEmpty()
        .withMessage("Description field should not be an empy")
        .isLength({ min: 5 })
        .withMessage('Description should be at least 5 characters')
], todoController.postTodo);

router.put('/todos/:todoId', isAuth, [
    param('todoId').trim().notEmpty()
        .withMessage("Todo parameter should be provided!"),
    body('title').trim().notEmpty()
        .withMessage("Title field should not be an empy")
        .isLength({ min: 5 })
        .withMessage('Description should be at least 5 characters'),
    body('description').trim().notEmpty()
        .withMessage("Description field should not be an empy")
        .isLength({ min: 5 })
        .withMessage('Description should be at least 5 characters')
], todoController.updateTodo);

router.delete('/todos/:todoId', isAuth, [
    param('todoId').trim().notEmpty()
        .withMessage("Todo parameter should be provided!")], todoController.deleteTodo);

router.get('/todos/:todoId', isAuth, [
    param('todoId').trim().notEmpty()
        .withMessage("Todo parameter should be provided!")], todoController.getTodo);


router.get('/todos', isAuth,todoController.getTodos);


module.exports = router;