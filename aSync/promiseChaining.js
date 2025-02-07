function setTimeoutPromisified(time){
    return new Promise((resolve) => {
            setTimeout(resolve, time);
        });
};

setTimeoutPromisified(1000).then(() => {
    console.log("hi");
    return setTimeoutPromisified(3000);
}).then(() => {
    console.log("how are you");
    return setTimeoutPromisified(5000);
}).then(()=> {
    console.log("its promise chaining");
})
