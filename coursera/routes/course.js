const { Router } = require("express");
const courseRouter = Router();
const { purchaseModel, courseModel } = require("../db");
const { userMiddleware } = require("../middleware/user");
courseRouter.post("/purchase", userMiddleware, async function (req, res) {
    const userId = req.userId;
    const courseId = req.body.courseId;
    if (!courseId) {
        return res.status(400).json({
            message: "Please provide a courseId", 
        });
    }

    const existingPurchase = await purchaseModel.findOne({
        courseId: courseId,
        userId: userId,
    });
    if (existingPurchase) {
        return res.status(400).json({
            message: "You have already bought this course",
        });
    } 
    
    await purchaseModel.create({
        courseId: courseId, // The ID of the course being purchased
        userId: userId,     // The ID of the user making the purchase
    });

    // If the purchase is successful, return a 201 status with a success message to the client
    res.status(201).json({
        message: "You have successfully bought the course", // Success message after purchase
    });
});

courseRouter.get("/preview", async function (req, res) {
    
    // Query the database to get all the courses available for purchase
    const courses = await courseModel.find({});

    // Return the queried course details as a JSON response to the client with a 200 status code
    res.status(200).json({
        courses: courses, // Send the course details back to the client
    });
});

module.exports = {
    courseRouter: courseRouter, // Export the router object
};