const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');





module.exports.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    encryptedPassword = await bcrypt.hash(password, salt);
    return encryptedPassword;


}