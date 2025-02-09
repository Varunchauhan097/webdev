const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const zod = require("zod");

const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

function signinJwt(username, password){
    const usernameResponse = emailSchema.safeParse(username);
    const passwordResponse = passwordSchema.safeParse(password);
    if(!usernameResponse.success || !passwordResponse.success){
        return null;
    }

    return jwt.sign({
        username
    }, jwtPassword);

}
function decodeJwt(token){
    const decode = jwt.decode(token);
    if(decode){
        return true;
    } else {
        return false;
    }
}
function verifyJwt(token){
    try {
        jwt.verify(token, jwtPassword);
        return true;  
    } catch(e){

    }
    return false;
}
// console.log(signinJwt("varusfs22n@gmail.com", "sdkfsalkfj"));

// console.log(decodeJwt("token"));
// console.log(verifyJwt("sfsdfsdfs"));


