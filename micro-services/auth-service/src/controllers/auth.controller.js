const User = require('../models/User');
const Student = require('../models/Student');
const Professor = require('../models/Professor');
const { createToken, encryptPassword } = require('../utils');
const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createNewUser = async (data) => {
    const user = await User.create(data);
    return user;
}





module.exports.register = async (req, res) => {
    try {

        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }

        const { first_name, last_name, email, password, role, speciality } = req.body;


        // separation of the register logic since the user can be connected with same email as student oo as professor
        if (role == 'student') {

            const user = await User.findOne({ email });
            const oldStudent = await Student.findOne({ user });

            // check if student exist
            if (oldStudent) { return res.status(409).json({"message":"Student Already Exist. Please Login"}); }

            // check if the user exist as professor
            else if (user && !oldStudent) {

                await user.updateOne({
                    role: [user.role[0], role[0]]
                }, { upsert: true });
                await Student.createStudent({ user });
                res.status(201).json({
                    'message': 'New Student is created.'
                });

            }
            else {
                //Encrypt the user password.
                const encryptedPassword = await encryptPassword(password);
                const user = await createNewUser(
                    {
                        first_name,
                        last_name,
                        email,
                        password: encryptedPassword,
                        role
                    })
                await Student.createStudent({ user });
                res.status(201).json({
                    'message': 'New User and Student are created.'
                });
            }

        }
        else if (role == 'professor') {

            const user = await User.findOne({ email });
            const oldProfessor = await Professor.findOne({ user });

            // check if professor exist
            if (oldProfessor) { return res.status(409).json({"message":"Student Already Exist. Please Login"}); }
            // check if the user exist as student
            else if (user && !oldProfessor) {
                await user.updateOne({
                    role: [user.role[0], role[0]]
                }, { upsert: true });
                await Professor.createProfessor({ user });
                res.status(201).json({
                    'message': 'New Professor is created.'
                });

            }
            else {
                //Encrypt the user password.
                const encryptedPassword = await encryptPassword(password);
                const user = await createNewUser(
                    {
                        first_name,
                        last_name,
                        email,
                        password: encryptedPassword,
                        role
                    })
                const data = {
                    user, 
                    speciality
                }
                await Professor.createProfessor(data);
                res.status(201).json({
                    'message': 'New User and Professor are created.'
                });
            }

        }


    } catch (error) {
        console.log(error);
    }

}


module.exports.login = async (req, res) => {
   
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
    }

    const email = req.body.login;
    const pwd = req.body.password;
    const user = await User.findOne({email});
    const { password, ...userWithoutPassword } = user;
    if (!user) {
        return res.json({ message: "User doesn't exist" });
    } else {
        const verifiedPwd = await bcrypt.compare(pwd, user.password);
        if (!verifiedPwd) {
            return res.json({ message: "Password Incorrect" });
        }
        const id = user._id.toJSON();
        const payload = {
            login,
            name: user.first_name + user.last_name
        };
        jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: maxAge },(err, token) => {
            if (err) console.log(err);
            else 
               return res.status(200).json({ "message": 'User logged in', "user": {...userWithoutPassword}._doc, "token": token });
        });
        
    }
}


module.exports.logout = async (req, res) => {
    /*  res.cookie('jwt', '', { maxAge: 1 });
     res.json({ "message" : "logged out"}); */
}