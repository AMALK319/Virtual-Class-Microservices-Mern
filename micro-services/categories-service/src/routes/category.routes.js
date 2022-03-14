const Router = require('express').Router();
const categoryController = require('../controllers/category.controller');


// auth routes
Router.get('/categories' , categoryController.getAllCategories);
Router.get('/categories/:id' , categoryController.getCategory);
Router.delete('/categories/:id' , categoryController.deleteCategory);
Router.post('/categories' , categoryController.createCategory);


module.exports = Router;