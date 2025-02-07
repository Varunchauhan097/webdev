const express = require("express");
const app = express();

app.get("/multiply", function(req, res){
    const a = req.query.a;
    const b = req.query.b;
    const ans = a*b;
    res.send("this is your ans" + ans);
})
app.get("/add", function(req, res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const ans = a+b;
    res.send("this is your ans" + ans);
})
app.get("/divide", function(req, res){
    const a = req.query.a;
    const b = req.query.b;
    const ans = a/b;
    res.send("this is your ans" + ans);
})
app.get("/subtract", function(req, res){
    const a = req.query.a;
    const b = req.query.b;
    const ans = a-b;
    res.send("this is your ans" + ans);
})
app.listen(3000);