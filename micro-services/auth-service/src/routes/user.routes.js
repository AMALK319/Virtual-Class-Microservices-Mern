const Router = require('express').Router();
const userController = require('../controllers/user.controller');
const { permit } = require('../middlewares/auth.middleware');





// crud routes
Router.get('/',  userController.getAllUsers);
/* Router.get('/', permit('professor'), userController.getAllUsers); */
Router.delete('/:id', userController.deleteUser);




module.exports = Router;