const Router = require('express').Router();
const courseController = require('../controllers/course.controller');
const { authorize } = require('../middlewares/auth.middleware')
const { authenticate } = require('../middlewares/auth.middleware');




// crud routes
/* Router.get('/', authorize('student'), courseController.getAllCourses); */
Router.get('/courses', courseController.getAllCourses);

Router.get('/courses/:id' , courseController.getCourseById);
Router.get('/my-courses/' , courseController.getCoursesByInstructorId); 
Router.post('/', courseController.createNewCourse);


/* Router.post('/' , authenticate, authorize('professor'), courseController.createNewCourse);  */

/* Router.get('/', permit('professor'), userController.getAllUsers); */


module.exports = Router;