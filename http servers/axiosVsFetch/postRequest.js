const axios = require("axios");

// async function main() {
//     const response = await fetch("https://www.postb.in/1738746917985-5886878925375", {
//         method: "POST"
//     })
//     const txt = await response.text();
//     console.log(txt);
    
// }

async function main() {
    const response = await axios.post("https://www.postb.in/1738746917985-5886878925375")
    console.log(response.data);
    
}

main();