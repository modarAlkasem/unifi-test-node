const { validationResult } = require('express-validator');
const Todo = require("./../models/todo");

exports.postTodo = async(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Input invalid!");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error) ;
    }
    const title = req.body.title;
    const description = req.body.description;
    const todo = new Todo({
        title : title,
        description : description,
        creator : req.userId
    });
    try{
        await todo.save();
        res.status(201).json({
            message : 'New Todo Created Successfully',
            todo : todo
        })
    }catch(error){
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

}