const jwt = require("jsonwebtoken");
const User = require("../models/User");


/* module.exports.authenticateToken = (req, res, next) => {

    
    const token = req.cookies.jwt;
    
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookie("jwt", "", { maxAge: 1 });
                res.status(401).json({ "message" : "unauthorized"});
            } else {
                let user = await UserModel.findById(decodedToken.id);
                req.user = user;
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        res.status(401).json({ "message" : "unauthorized"});
    }
} */

module.exports.authenticateToken = (req, res, next) => {

    
    /* const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] */
    const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
    
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.status(401).json({ "message" : "unauthorized"});
            } else {
                let user = await User.findById(decodedToken.id);
                req.user = user;
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        res.status(401).json({ "message" : "unauthorized"});
    }
}