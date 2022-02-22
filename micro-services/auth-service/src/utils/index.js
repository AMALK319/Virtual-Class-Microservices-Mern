const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const maxAge = 3 * 24 * 60 * 60 * 1000;

module.exports.createToken = (id) => {
 
    return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: maxAge });


}

module.exports.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    encryptedPassword = await bcrypt.hash(password, salt);
    return encryptedPassword;


}