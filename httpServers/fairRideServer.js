const express = require("express");
const app = express();

function isAnAdult(req, res, next){
    const age = req.query.age;
    if(age>=18) next();
    else {
        res.status(200).json({
            msg: "you're not old enough to ride"
        })
    }
}

app.use(isAnAdult);

app.get("/ride1", function(req, res){
    res.json({
        msg: "you can have riden the ride 1"
    });
});

app.get("/ride1", function(req, res){
    res.json({
        msg: "you can have riden the ride 1"
    });
});

app.listen(3000);