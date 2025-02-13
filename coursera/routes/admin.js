const {Router} = require("express")
const adminRouter = Router();
const { adminModel, courseModel } = require("../db")
const {z} = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin")
// console.log("asfjaskl")

adminRouter.post("/signup", async function(req, res){
    // const reqw = z.object()
    const requireBody = z.object({
        email: z.string().min(3).max(100).email(),
        password: z.string().min(3).max(100),
        firstName: z.string().min(3).max(100),
        lastName: z.string().min(3).max(100)
    })
    if(!requireBody.safeParse(req.body).success){
        return res.json({
            error: requireBody.safeParse(req.body).error
        })
    }

    const { email, password, firstName, lastName } = req.body;
    const hashPassword = await bcrypt.hash(password, 5);
    try {
        await adminModel.create({
            email,
            password: hashPassword,
            firstName,
            lastName
        })
    } catch(e){
        return res.status(400).json({
            message: "You are already signup", // Provide a message indicating signup failure
        });
    }
    res.json({
        msg: "signup"
    })
})  

adminRouter.post("/signin", async function(req, res){
    const responseBody = z.object({
        email: z.string().email(),
        password: z.string().min(3)
    })

    if(!responseBody.safeParse(req.body).success){
        return res.json({
            error: responseBody.safeParse(req.body).error
        })
    }

    const { email, password} = req.body;
    const user = await adminModel.findOne({
        email
    })

    if(!user){
        return res.json({
            msg:"user not found"
        })
    }
    const passMatch = await bcrypt.compare(password, user.password);
    if(!passMatch){
        return res.json({
            msg: "password incorrect"
        })
    }
    const token = jwt.sign({
        id: user._id
    }, JWT_ADMIN_PASSWORD);

    console.log(token)
    res.json({  
        token
    })
}) 

adminRouter.post("/course", adminMiddleware , async function(req, res){
    const adminId = req.adminId;
    const requireBody = z.object({
        title: z.string().min(3),
        discription: z.string().min(10),
        imageUrl: z.string().url(),
        price: z.number().positive()
  

    })
    if(!requireBody.safeParse(req.body).success){
        return res.json({
            error: requireBody.safeParse(req.body).error
        })
    }
    const { title, discription, price, imageUrl } = req.body;
    const course = await courseModel.create({
        title,
        discription,
        price,
        imageUrl,
        creatorId: adminId
    })

    res.json({
        msg: "course created",
        courseId: course._id                        
    })
}) 

adminRouter.put("/course",adminMiddleware, async function(req, res){
    const adminId = req.adminId;
    const { title, discription, price, imageUrl, courseId } = req.body;
    await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    }, {
        title,
        discription,
        price,
        imageUrl
    })
    res.json({
        msg: "updated successfully"
    })
}) 

adminRouter.get("/course/bulk", adminMiddleware, async function (req, res) {
    const adminId = req.adminId;
    const courses = await courseModel.findOne({
        creatorId: adminId
    })

    res.json({
        courses
    })
    
})
module.exports = {
    adminRouter
} 