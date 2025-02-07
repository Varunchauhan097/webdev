const axios = require("axios");

// async function main() {
//     const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
//     const json = await response.json();
//     console.log(json.title);
// }

async function main() {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
    // const json = await response.json();
    console.log(response.data.title);
}

main();