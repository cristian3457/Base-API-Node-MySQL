"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router();
router.get('/usuarios', (req, res) => {
    const query = `SELECT * FROM usuarios`;
    mysql_1.default.ejecutarQuery(query, (err, usuarios) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                usuarios
            });
        }
    });
});
router.get('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const escapeId = mysql_1.default.instance.cnn.escape(id);
    const query = `SELECT * FROM usuarios where id = ${escapeId}`;
    mysql_1.default.ejecutarQuery(query, (err, heroe) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                heroe: heroe[0]
            });
        }
    });
});
router.post('/usuarios', (req, res) => {
    const body = req.body;
    const escapeNombre = mysql_1.default.instance.cnn.escape(body.nombre);
    const escapeApellidos = mysql_1.default.instance.cnn.escape(body.apellidos);
    const escapeEmail = mysql_1.default.instance.cnn.escape(body.email);
    const escapeEstado = mysql_1.default.instance.cnn.escape(body.estado);
    const escapeRol = mysql_1.default.instance.cnn.escape(body.rol);
    const escapeImg = mysql_1.default.instance.cnn.escape(body.img);
    const escapePassword = mysql_1.default.instance.cnn.escape(body.password);
    const query = `INSERT INTO usuarios(nombre,apellidos,email,estado,rol,img,password) VALUES 
    (${escapeNombre},${escapeApellidos},${escapeEmail},${escapeEstado},${escapeRol},${escapeImg},${escapePassword})`;
    let datos = {
        nombre: escapeNombre,
        Apellidos: escapeApellidos,
        email: escapeEmail,
        estado: escapeEstado,
        rol: escapeRol,
        img: escapeImg,
        password: escapePassword
    };
    mysql_1.default.ejecutarQuery(query, (err, heroe) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                heroe: datos
            });
        }
    });
});
router.put('/usuarios/:id', (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const escapeNombre = mysql_1.default.instance.cnn.escape(body.nombre);
    const escapeApellidos = mysql_1.default.instance.cnn.escape(body.apellidos);
    const escapeEmail = mysql_1.default.instance.cnn.escape(body.email);
    const escapeEstado = mysql_1.default.instance.cnn.escape(body.estado);
    const escapeRol = mysql_1.default.instance.cnn.escape(body.rol);
    const escapeImg = mysql_1.default.instance.cnn.escape(body.img);
    const escapePassword = mysql_1.default.instance.cnn.escape(body.password);
    const query = `UPDATE usuarios SET nombre = ${escapeNombre}, apellidos = ${escapeApellidos}, email =  ${escapeEmail},
    estado =  ${escapeEstado}, rol =  ${escapeRol}, img =  ${escapePassword},img =  ${escapePassword} WHERE id = ${id}`;
    let datos = {
        nombre: escapeNombre,
        Apellidos: escapeApellidos,
        email: escapeEmail,
        estado: escapeEstado,
        rol: escapeRol,
        img: escapeImg,
        password: escapePassword
    };
    mysql_1.default.ejecutarQuery(query, (err, heroe) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                heroe: datos
            });
        }
    });
});
router.delete('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM usuarios WHERE id = ${id}`;
    mysql_1.default.ejecutarQuery(query, (err, heroe) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                heroe
            });
        }
    });
});
exports.default = router;
