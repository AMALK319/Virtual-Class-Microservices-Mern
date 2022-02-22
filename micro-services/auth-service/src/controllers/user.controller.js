const User = require('../models/User');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = (req, res) => {

    User.find().select('-password')
        .then(users => res.status(200).json({ users }))
        .catch(err => res.status(404).send({ err }));

}



module.exports.deleteUser = (req, res) => {
    const user_id = req.params.id;
    //if (!ObjectID.isValid(user_id)) return res.status(400).json(`Id invalid : ${user_id}`)
    User.deleteOne({ 'id': user_id })
        .then(res.status(200).json({ "message": "User deleted " }))
        .catch(err => res.status(404).json({ "message": "User not found" }));
}