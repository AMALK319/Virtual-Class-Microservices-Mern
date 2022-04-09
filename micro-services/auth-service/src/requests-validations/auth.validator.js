const { body } = require('express-validator');

exports.validate = (method) => {
  switch (method) {
    case 'register':
      {
        return [
          body('firstName', 'First Name doesn\'t exists').exists(),
          body('lastName', 'Last Name doesn\'t exists').exists(),
          body('email', 'Invalid email').exists().isEmail(),
         /*  body('password', 'Password should be combination of one uppercase , one lower case, one special char, one digit and min 6')
            .exists()
            .isLength({ min: 6 })
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/, "i"),
          body(
            'password_confirmation',
            'Password Confirmation must have the same value as the password field',
          )
            .exists()
            .custom((value, { req }) => value === req.body.password), */

        ]
      }
      
      case 'login':
      {
        return [
          body('email', 'Invalid email').exists().isEmail(),
          body('password', 'Password doesn\'t exists').exists(),
         

        ]
      }
  }
}