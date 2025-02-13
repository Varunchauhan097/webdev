const {Router} = require("express")
const userRouter = Router();
const {userModel, purchaseModel } = require("../db")
const {z} = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { JWT_USER_PASSWORD } = require("../config");
const { userMiddleware } = require("../middleware/user")


userRouter.post("/signup",async function(req, res){
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
        await userModel.create({
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

userRouter.post("/signin", async function(req, res){
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
    const user = await userModel.findOne({
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
    }, JWT_USER_PASSWORD);

    console.log(token)
    res.json({  
        token
    })
}) 

userRouter.get("/purchases", userMiddleware , async function(req, res){
    const userId = req.userId;
    const purchases = await purchaseModel.find({
        userId
    })
    const courseData = await userModel.find({
        _id: { $in: purchases.map(x => x.courseId) }
    })
    
    res.json({
        purchases,
        courseData
    }) 
})

module.exports = {
    userRouter
} 
