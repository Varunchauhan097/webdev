const fs= require("fs");
function print(err, data){
    if (err){
        console.log("File not found");
    } else
    console.log(data);
}
fs.readFile("a.txt", "utf-8", print);
fs.readFile("b.txt", "utf-8", print);
console.log("Hi There is some file over here");