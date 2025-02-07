const fs = require("fs");
new Promise(function(resolve, reject){
    fs.readFile("a.txt", "utf-8", function(err, data){
        if(err){
            reject("file not found");
        } else {
            resolve(data);
        }
    })
}).then(function(data){
    console.log(data);
}).catch(function(err){
    console.log("ERROR: " + err);
})