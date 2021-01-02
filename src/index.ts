import Server from './server/server';
import router from './router/router';
import usuario from './router/usuario';
import MySQL from './mysql/mysql';
import bodyParser from 'body-parser';
let puerto:any = process.env.PORT || 3000;

const server = Server.init(puerto);

// CORS
server.app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

// Body Parser

// parse application/x-www-form-urlencoded
server.app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
server.app.use(bodyParser.json());
server.app.use(router);
server.app.use(usuario);

// const mysql = new MySQL();
MySQL.instance;

server.start(()=>{
    console.log('Servidor corriendo en el puerto:',puerto);
})