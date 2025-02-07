const fs = require("fs");
// const { resolve } = require("path");

function readFileAsync(){
    return new Promise((resolve, reject) => {
        fs.readFile("a.txt", "utf-8", function(err, data){
            if(err) console.log("file not found");
            else console.log(data);
        });
    });
};

async function solve(){
    await readFileAsync();
    console.log("its async await");
};
solve();