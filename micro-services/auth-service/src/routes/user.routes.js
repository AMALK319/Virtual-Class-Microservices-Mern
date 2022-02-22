const Router = require('express').Router();
const userController = require('../controllers/user.controller');




// crud routes
Router.get('/', userController.getAllUsers);
Router.delete('/:id', userController.deleteUser);




module.exports = Router;