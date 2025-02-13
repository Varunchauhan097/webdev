require('dotenv').config();
// console.log(process.env.MONGODB_URL);

const express = require("express");
const mongoose = require("mongoose")
const {userRouter} = require("./routes/user");
const {courseRouter} = require("./routes/course");
const {adminRouter} = require("./routes/admin")
const app = express();
app.use(express.json())


app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

async function main() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        app.listen(process.env.PORT);    
    } catch (e){
        console.log("cant connect to db")
    }
}

main();