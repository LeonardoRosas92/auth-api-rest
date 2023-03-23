const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const {dbConnection} = require('../database/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            init: '/api/init',
        }
        //Conexion a la BD
        this.conectarDB();
        //Middlewares
        this.middlewares();
        //Rutas de mi aplicacion 
        this.routes();
    }
    async conectarDB(){
        await dbConnection();
    }

    middlewares(){  
        //CORS
        this.app.use(cors())
        // Lectura y parseo del body
        this.app.use(express.json());
        //Directorio publico
        this.app.use( express.static('public'));
        //Fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes(){
        this.app.use(this.paths.init, require('../routes/init'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        })
    }
}

module.exports = Server