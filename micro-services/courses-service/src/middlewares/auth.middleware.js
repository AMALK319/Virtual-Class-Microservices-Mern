const jwt = require("jsonwebtoken");
const User = require("../models/User");


module.exports.authenticate = (req, res, next) => {

    const token =
        req.body.token || req.query.token || req.headers.accessToken;
        console.log(token);
        /* const token = req.headers['x-access']
        console.log(token); */
    
        if (token) {
        

            jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
                try {
                    email = decodedToken.email;
                    let user = await User.findOne({ email });
                    req.user = user;
                    res.locals.user = user;
                    next();
                } catch (error) {
                    res.locals.user = null;
                    res.status(401).json({ "message": "Unauthorized. Token Compromized." });
                }

            })
        }
        else {
            /* res.locals.user = null; */
            res.status(401).json({ "message": "Unauthorized" });
        }
    
}

// middleware for doing role-based permissions
module.exports.authorize = (...permittedRoles) => {
    // return a middleware
    return (req, res, next) => {
        const { user } = req;
        var found = false;
        if (permittedRoles.length) {

            user.role.map((role) => {
                if (permittedRoles.includes(role)) {
                    found = true;
                    next();
                }
            })
            if (found == false) res.status(401).json({ message: "Unauthorized. You don't have required permission." }); // user is forbidden
        }

    }

}
