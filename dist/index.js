"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server/server"));
const router_1 = __importDefault(require("./router/router"));
const mysql_1 = __importDefault(require("./mysql/mysql"));
const body_parser_1 = __importDefault(require("body-parser"));
let puerto = process.env.PORT || 3000;
const server = server_1.default.init(puerto);
// Body Parser
// parse application/x-www-form-urlencoded
server.app.use(body_parser_1.default.urlencoded({ extended: false }));
// parse application/json
server.app.use(body_parser_1.default.json());
server.app.use(router_1.default);
// const mysql = new MySQL();
mysql_1.default.instance;
server.start(() => {
    console.log('Servidor corriendo en el puerto:', puerto);
});
