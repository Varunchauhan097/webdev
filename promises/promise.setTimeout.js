new Promise(function(resolve, reject){
    setTimeout(function(){
        console.log("Out of time");
        resolve();
    })
}).then(function(){
    console.log("say that i cant love you");
})