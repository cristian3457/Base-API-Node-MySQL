import Server from './server/server';
import router from './router/router';
import usuario from './router/usuario';
import MySQL from './mysql/mysql';
import bodyParser from 'body-parser';
let puerto:any = process.env.PORT || 3000;

const server = Server.init(puerto);

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