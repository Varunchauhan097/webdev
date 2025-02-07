
// const promiseOne = new Promise (function(resolve, reject){
//     setTimeout(function(){
//         console.log("async task is done")
//         resolve()
//     }, 1000);
// })
// promiseOne.then(function(){
//     console.log("promise consumed");
// })





// new Promise(function(resolve, reject){
//     setTimeout(function(){
//         console.log("aync task 2");
//         resolve();
//     })
// }).then(function(){
//     console.log("promise 2 consumed");
// })





new Promise(function(resolve, reject){
    setTimeout(function(){
        resolve({username: "varun", email: "varunchauhan097@gmail.com"})
    }, 10000);
}).then(function(data){
    console.log(data);
});