const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const { connectDB } = require('./config/db-config');
const eureka = require('../../eureka-helper/index');
require('dotenv').config({ path: './config/.env' });


const server = express();

//constantes utiles
const port = process.env.PORT || 8002;
const courseRoutes = require('./src/routes/course.routes');
const { authenticate } = require('./src/middlewares/auth.middleware');



//middelwares
server.use(bodyParser.json());
server.use(express.urlencoded({ extended: true }));

//Cors 
const corsOpts = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST']
};

/* server.options('*', cors()) */
server.use(cors(corsOpts));


/* server.use('/api/courses', authenticate, courseRoutes); */
server.use('/api',  courseRoutes);



const start = async () => {

    try {
        await server.listen(port, () => { console.log(`Server started on ${port}`) });
        await eureka.registerWithEureka('courses-service', port);
        connectDB();
    } catch (error) {
        console.log(error);
    }


}
start()