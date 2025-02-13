const {Router} = require("express")
const userRouter = Router();
const {userModel, purchaseModel } = require("../db")

userRouter.post("/signin", function(req, res){

}) 

userRouter.post("/signup", function(req, res){

}) 

userRouter.get("/purchases", userMiddleware , async function(req, res){
    const userId = req.userId;
    const purchases = await purchaseModel.find({
        userId
    })
    const courseData = await courseModel.find({
        _id: { $in: purchases.map(x => x.courseId) }
    })
    
    res.json({
        purchases,
        coursesData
    }) 
})

module.exports = {
    userRouter
} 
