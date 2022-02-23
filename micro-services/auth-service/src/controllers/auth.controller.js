const User = require('../models/User');
const Student = require('../models/Student');
const Professor = require('../models/Professor');
const { createToken, encryptPassword } = require('../utils');
const { validationResult } = require('express-validator/check');


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

        const reqData = req.body;
        const { first_name, last_name, email, password, role, status } = reqData;
        

        // separation of the register logic since the user can be connected with same email as student oo as professor
        if (role == 'student') {

            const user = await User.findOne({ email });
            const oldStudent = await Student.findOne({ user });

            // check if student exist
            if (oldStudent) { return res.status(409).send("Student Already Exist. Please Login"); }

            // check if the user exist as professor
            else if (user && !oldStudent) {

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
            if (oldProfessor) { return res.status(409).send("Professor Already Exist. Please Login"); }
            // check if the user exist as student
            else if (user && !oldProfessor) {

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
                await Professor.createProfessor({ user });
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

}


module.exports.logout = async (req, res) => {

}