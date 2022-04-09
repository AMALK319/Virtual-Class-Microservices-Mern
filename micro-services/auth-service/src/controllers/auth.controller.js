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

        const { firstName, lastName, email, password, role, speciality } = req.body;


        // separation of the register logic since the user can be connected with same email as student oo as professor
        if (role == 'student') {

            const user = await User.findOne({ email });
            const oldStudent = await Student.findOne({ user });

            // check if student exist
            if (oldStudent) { return res.status(409).json({ "message": "Student Already Exist. Please Login" }); }

            // check if the user exist as professor
            else if (user && !oldStudent) {

                await user.updateOne({
                    role: [user.role[0], role[0]]
                }, { upsert: true });
                await Student.createStudent({ user });
                const payload = {
                    email,
                    name: user.firstName + user.lastName
                };
                jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: maxAge }, (err, token) => {
                    if (err) console.log(err);
                    else
                        return res.status(201).json({ "message": 'New Student is created.',  "token": token });
                });
                /* res.status(201).json({
                    'message': 'New Student is created.'
                }); */

            }
            else {
                //Encrypt the user password.
                const encryptedPassword = await encryptPassword(password);
                const user = await createNewUser(
                    {
                        firstName,
                        lastName,
                        email,
                        password: encryptedPassword,
                        role
                    })
                await Student.createStudent({ user });
                const payload = {
                    email,
                    name: user.firstName + user.lastName
                };
                jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: maxAge }, (err, token) => {
                    if (err) console.log(err);
                    else
                        return res.status(201).json({ "message": 'New User and Student are created.',  "token": token });
                });
               
            }

        }
        else if (role == 'professor') {

            const user = await User.findOne({ email });
            const oldProfessor = await Professor.findOne({ user });

            // check if professor exist
            if (oldProfessor) { return res.status(409).json({ "message": "Student Already Exist. Please Login" }); }
            // check if the user exist as student
            else if (user && !oldProfessor) {
                await user.updateOne({
                    role: [user.role[0], role[0]]
                }, { upsert: true });
                await Professor.createProfessor({ user });
                const payload = {
                    email,
                    name: user.firstName + user.lastName
                };
                jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: maxAge }, (err, token) => {
                    if (err) console.log(err);
                    else
                        return res.status(201).json({ "message": 'New Professor is created.',  "token": token });
                });
               /*  res.status(201).json({
                    'message': 'New Professor is created.'
                }); */
            }
            else {
                //Encrypt the user password.
                const encryptedPassword = await encryptPassword(password);
                const user = await createNewUser(
                    {
                        firstName,
                        lastName,
                        email,
                        password: encryptedPassword,
                        role
                    })
                const data = {
                    user,
                    speciality
                }
                await Professor.createProfessor(data);
                const payload = {
                    email,
                    name: user.firstName + user.lastName
                };
                jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: maxAge }, (err, token) => {
                    if (err) console.log(err);
                    else
                        return res.status(201).json({ "message": 'New User and Professor are created.',  "token": token });
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
    try {
        const email = req.body.email;
        const pwd = req.body.password;
        const choosenRole = req.body.choosenRole;
        const user = await User.findOne({ email });
        const { password, ...userWithoutPassword } = user;
        const verifiedPwd = await bcrypt.compare(pwd, user.password);
        if (!verifiedPwd) {
            return res.status(422).json({ message: "Password Incorrect" });
        }
        if( !user.role.includes(choosenRole)){
            return res.status(422).json({ message: "Login failed" });
        }
        const payload = {
            email,
            name: user.firstName + user.lastName
        };
        jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: maxAge }, (err, token) => {
            if (err) console.log(err);
            else
                return res.status(200).json({ "message": 'User logged in', "user": { ...userWithoutPassword }._doc, "token": token, "choosenRole": choosenRole });
        });
    } catch (error) {
        return res.json({ message: "User doesn't exist" }); 

    }


}


module.exports.logout = async (req, res) => {
    /*  res.cookie('jwt', '', { maxAge: 1 });
     res.json({ "message" : "logged out"}); */
}