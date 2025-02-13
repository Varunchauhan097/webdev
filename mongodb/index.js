const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const app = express();
const {UserModel, TodoModel} = require("./db");
const mongoose = require("mongoose");
// const JWT_PASSWORD= "mydearmelancholy";
mongoose.connect("mongodb+srv://dakotajansons:Dakota%40Mongodb123@cluster0.bk1xb.mongodb.net/todo")

app.use(express.json());

app.post("/signup", async function(req, res) {
    const requireBody = z.object({
        email: z.string().min(3).max(100).email(),
        password: z.string().min(3).max(100),
        name: z.string().min(3).max(100)
    })

    if(!requireBody.safeParse(req.body).success){
        res.json({
            error: requireBody.safeParse(req.body).error
        })
        return;
    }
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    // let err = false;
    const hashedPass = await bcrypt.hash(password, 5);
    console.log(hashedPass);
    
    await UserModel.create({
        email: email,
        password: hashedPass,
        name: name
    });
    res.json({
        message: "You are signed up"
    })

});

const JWT_SECRET = "s3cret";

app.post("/signin", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({                          //findOne(method)
        email: email
    });
    if(!response) {
        res.json({
            msg: "incorrect credentials"
        })
        return;
    }
    const passMatch = await bcrypt.compare(password, response.password);
    console.log(passMatch);
    
    if (passMatch) {
        const token = jwt.sign({
            id: response._id.toString()                          //send string to db never number
        }, JWT_SECRET)

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
});

function auth(req, res, next){
    const token = req.headers.token;
    const response = jwt.verify(token, JWT_SECRET);
    if(response){
        req.userId= response.id;                            //important
        next();
    } else {
        res.status(403).json({
            msg: "wrong credentials"
        })
    }

}

app.post("/todo", auth,async function (req, res) {
    const userId = req.userId;
    const title = req.body.title;
    await TodoModel.create({
        title,
        userId
    })
    res.json({
        userId: userId
    })
});

app.get("/todos", auth,async function (req, res) {
    const userId = req.userId;
    // const title = req.body.title;
    const todos = await TodoModel.find({
        userId: userId
        // userId
    })
    res.json({
        todos
    })
})

app.listen(3000);