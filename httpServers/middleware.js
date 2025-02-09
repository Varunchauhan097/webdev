const express = require("express");
const app = express();

function middleWare(req, res, next){
    console.log(req.url)
    console.log(req.method)
    console.log(req.hostname)
    console.log(new Date());
    next();
}

app.get("/add/:a/:b", middleWare,  function(req, res){
    const a= parseInt(req.params.a);
    const b = parseInt(req.params.b);
    res.json({
        ans: a+b
    })

})
app.listen(3000);