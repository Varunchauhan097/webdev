const express = require('express');
const jwt = require("jsonwebtoken");
const app = express();
const JWT_SECRET = "mydearmelancholy";
app.use(express.json());
const users=[];
function auth(req, res, next){
    const token = req.headers.token;
    const user = jwt.verify(token, JWT_SECRET);
    if(user){
        next();
    } else {
        res.status(401).send({
            message: "unauthorized"
        })
    }
}
app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username,
        password
    });

    res.status(200).json({
        msg: "User created",
    })
});

app.post("/signin", (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const user = users.find((user)=> user.username == username && user.password == password);
    if(user){
        const token = jwt.sign({
            username: username
        }, JWT_SECRET);

        res.send({
            token
        })
        console.log(users)
    } else {     
        res.status(403).json({
            msg: "invalid username or password"
        })
    }

})
app.get("/me", (req, res) => {
    auth(res, );
})
app.listen(3000);