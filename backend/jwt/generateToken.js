const jwt = require("jsonwebtoken");
// JWT_TOKEN = "dIVauce36+VDNDpFLTJJz6D5BFT3HOHuXeP2Rpd3d+Q=";

const createTokenAndSaveCookie = (userId, res) => {
    const token = jwt.sign({userId},process.env.JWT_TOKEN, {
        expiresIn: "1d"
    });

    res.cookie("jwt", token, {
        httpOnly: true, //xss attacks
        secure: true,
        sameSite: "strict" //csrf
    });
    return token;

}

module.exports = {
    createTokenAndSaveCookie
}