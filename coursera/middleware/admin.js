const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");

function adminMiddleware(req, res, next) {
    const token = req.headers.token;
    try {
        const response = jwt.verify(token, JWT_ADMIN_PASSWORD);
        req.adminId = response.id;
        next();
    } catch(e){
        res.json({
            msg: "invalid token"
        })
    }
}

module.exports = {
    adminMiddleware
}