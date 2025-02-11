const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;
const userSchema = Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
})

const courseSchema = Schema({
    title: String,
    discription: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
})

const adminSchema = Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
})

const purchaseSchema = Schema({
    courseId: objectId,
    userId: objectId
})

const userModel = mongoose.Model("user", userSchema);
const adminModel = mongoose.Model("admin", adminSchema);
const courseModel = mongoose.Model("course", courseSchema);
const purchaseModel = mongoose.Model("purchase", purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}