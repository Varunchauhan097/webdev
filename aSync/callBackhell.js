setTimeout(() => {
    console.log("hi");
    setTimeout(() => {
        console.log("how are you");
        setTimeout(() => {
            console.log("its callBack Hell!");
        }, 4000);
    }, 3000);
}, 1000);