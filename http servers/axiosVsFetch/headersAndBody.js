const axios = require("axios");

// async function main() {
//     const response = await fetch("https://www.postb.in/1738746917985-5886878925375", {
//         method: "POST",
//         body: {
//             username: "varunchauhan097",
//             password: "12345678"
//         },
        
//         Headers: {
//             Authorization: "Bearer 123"
//         }
        
//     })
//     const txt = await response.text();
//     console.log(txt);
    
// }

async function main() {
    const response = await axios({
        url: "https://www.postb.in/1738746917985-5886878925375", 
        method: "POST",
        headers: {
            username: "varunchauhan097",
            password: "12345678"
        }, 
        data: {
            Authorization: "Bearer 123"
        }
    })
    console.log(response.data);
    
}

//in POST, PUT, DELETE(first argument is body, second is header)
//only in GET (first argument is header & we cant send the body)


main();