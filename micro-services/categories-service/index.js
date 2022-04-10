const express = require('express');
const bodyParser = require('body-parser');

const { connectDB } = require('./config/db-config');
const eureka = require('eureka-helper/index');
require('dotenv').config({ path: './config/.env' });
const auth = require('./src/middlewares/auth.middleware');


const server = express();

//constantes utiles
const port = process.env.PORT || 8001;
const categoryRoutes = require('./src/routes/category.routes');



//middelwares
server.use(bodyParser.json());
server.use(express.urlencoded({ extended: true }));

//routes
server.use('/api', auth.authenticateToken , categoryRoutes);



const start = async () => {

    try {
        await server.listen(port, () => { console.log(`Server started on ${port}`) });
        await eureka.registerWithEureka('categories-service', port);
        connectDB();
    } catch (error) {
        console.log(error);
    }


}
start()