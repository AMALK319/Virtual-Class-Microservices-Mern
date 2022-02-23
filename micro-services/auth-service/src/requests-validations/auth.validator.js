const { body } = require('express-validator/check');

exports.validate = (method) => {
  switch (method) {
    case 'register':
      {
        return [
          body('first_name', 'First Name doesn\'t exists').exists(),
          body('last_name', 'Last Name doesn\'t exists').exists(),
          body('email', 'Invalid email').exists().isEmail(),
          body('password', 'Password should be combination of one uppercase , one lower case, one special char, one digit and min 6')
            .exists()
            .isLength({ min: 6 })
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/, "i"),
          body(
            'passwordConfirmation',
            'Password Confirmation must have the same value as the password field',
          )
            .exists()
            .custom((value, { req }) => value === req.body.password),

        ]
      }
  }
}