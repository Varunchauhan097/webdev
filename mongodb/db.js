const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const user = new Schema({
    email: String,
    password: String,
    name: String
})
const todo = new Schema({
    title: String,
    done: Boolean,
    userId: ObjectId
})
const userModel = mongoose.model("users", user);
const todoModel = mongoose.model("todos", todo)
module.exports = {
    userModel: userModel,
    todoModel: todoModel
}