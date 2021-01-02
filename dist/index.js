"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server/server"));
const router_1 = __importDefault(require("./router/router"));
const usuario_1 = __importDefault(require("./router/usuario"));
const mysql_1 = __importDefault(require("./mysql/mysql"));
const body_parser_1 = __importDefault(require("body-parser"));
let puerto = process.env.PORT || 3000;
const server = server_1.default.init(puerto);
// CORS
server.app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});
// Body Parser
// parse application/x-www-form-urlencoded
server.app.use(body_parser_1.default.urlencoded({ extended: false }));
// parse application/json
server.app.use(body_parser_1.default.json());
server.app.use(router_1.default);
server.app.use(usuario_1.default);
// const mysql = new MySQL();
mysql_1.default.instance;
server.start(() => {
    console.log('Servidor corriendo en el puerto:', puerto);
});
