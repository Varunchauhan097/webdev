const Router = require("express");
const courseRouter = Router();
const {courseModel, purchaseModel} = require("../db")


courseRouter.post("purchase", function(req, res){

})

courseRouter.get("preview", function(req, res){
    
})

module.exports = {
    courseRouter
}