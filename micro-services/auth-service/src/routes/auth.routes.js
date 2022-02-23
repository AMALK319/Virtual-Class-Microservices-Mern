const Router = require('express').Router();
const authController = require('../controllers/auth.controller');
const validateRequest = require('../requests-validations/auth.validator');


// auth routes
Router.post('/register' ,validateRequest.validate('register') , authController.register);
Router.post('/login' , authController.login);
Router.get('/logout' , authController.logout);

module.exports = Router;