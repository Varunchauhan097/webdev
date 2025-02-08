const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const {UserModel, TodoModel} = require("./db");
const mongoose = require("mongoose");
// const JWT_PASSWORD= "mydearmelancholy";
mongoose.connect("mongodb+srv://dakotajansons:Dakota%40Mongodb123@cluster0.bk1xb.mongodb.net/todo")

app.use(express.json());

app.post("/signup", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    await UserModel.create({
        email: email,
        password: password,
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

    const response = await UserModel.findOne({
        email: email,
        password: password,
    });

    if (response) {
        const token = jwt.sign({
            id: response._id.toString()
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
        req.userId= response.id;
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