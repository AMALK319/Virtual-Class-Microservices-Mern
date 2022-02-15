const express = require('express');
const bodyParser = require('body-parser');

const { connectDB } = require('./config/db-config');
const eureka = require('../../eureka-helper/index');
require('dotenv').config({ path: './config/.env' });


const server = express();

//constantes utiles
const port = process.env.PORT || 8002;


//middelwares
server.use(bodyParser.json());
server.use(express.urlencoded({ extended: true }));




const start = async () => {

    try {
        await server.listen(port, () => { console.log(`Server started on ${port}`) });
        await eureka.registerWithEureka('auth-service', port);
        //connectDB();
    } catch (error) {
        console.log(error);
    }


}
start()