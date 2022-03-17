const { validationResult } = require('express-validator');
const Todo = require("./../models/todo");

exports.postTodo = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Input invalid!");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    const title = req.body.title;
    const description = req.body.description;
    const todo = new Todo({
        title: title,
        description: description,
        creator: req.userId
    });
    try {
        await todo.save();
        res.status(201).json({
            message: 'New Todo Created Successfully',
            todo: todo
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

}

exports.updateTodo = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Invalid URL's Parameter!");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }

    const todoId = req.params.todoId;
    const userId = req.userId;
    const title = req.body.title;
    const description = req.body.description;
    try {
        const todo = await Todo.findById(todoId);
        if (!todo) {
            const error = new Error("Todo Not Found!");
            error.statusCode = 404;
            return next(error);
        }
        if (todo.creator.toString() !== userId) {
            const error = new Error("Not Authorized!");
            error.statusCode = 403;
            return next(error);
        }
        todo.title = title;
        todo.description = description;
        await todo.save();
        res.status(200).json({
            message: "Todo Updated Successfully",
            todo: todo
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }




}


exports.deleteTodo = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Invalid URL's Parameter!");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    const todoId = req.params.todoId;
    const userId = req.userId;
    try {
        const todo = await Todo.findById(todoId);
        if (!todo) {
            const error = new Error("Todo Not Found!");
            error.statusCode = 404;
            return next(error);
        }
        if (todo.creator.toString() !== userId) {
            const error = new Error("Not Authorized!");
            error.statusCode = 403;
            return next(error);
        }

        await todo.remove();
        res.status(200).json({
            message: "Todo Removed Successfully"
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

}


exports.getTodo = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Invalid URL's Parameter!");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    const todoId = req.params.todoId;
    const userId = req.userId;
    try {
        const todo = await Todo.findById(todoId);
        if (!todo) {
            const error = new Error("Todo Not Found!");
            error.statusCode = 404;
            return next(error);
        }
        if (todo.creator.toString() !== userId) {
            const error = new Error("Not Authorized!");
            error.statusCode = 403;
            return next(error);
        }
        res.status(200).json({
            message: "Todo returned  Successfully",
            todo: todo
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

}