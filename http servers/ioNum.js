const express = require("express");
const app = express();

function sum(a){
  let n=0;
  for(let i=0; i<=a; i++){
    n+=i;
  }
  return n;
}

app.get('/', function(req, res){ //request, response
  const a = req.query.a;
  const ans = sum(a);
  res.send("This is your ans " + ans);
})

app.listen(3000);