"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router();
router.get('/heroes', (req, res) => {
    const query = `SELECT * FROM heroes`;
    mysql_1.default.ejecutarQuery(query, (err, heroes) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                heroes
            });
        }
    });
});
router.get('/heroes/:id', (req, res) => {
    const id = req.params.id;
    const escapeId = mysql_1.default.instance.cnn.escape(id);
    const query = `SELECT * FROM heroes where id = ${escapeId}`;
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
router.post('/heroes', (req, res) => {
    const body = req.body;
    const escapeNombre = mysql_1.default.instance.cnn.escape(body.nombre);
    const escapePoder = mysql_1.default.instance.cnn.escape(body.poder);
    const query = `INSERT INTO heroes(nombre,poder) VALUES (${escapeNombre},${escapePoder})`;
    let datos = {
        nombre: escapeNombre,
        poder: escapePoder
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
router.put('/heroes/:id', (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const escapeNombre = mysql_1.default.instance.cnn.escape(body.nombre);
    const escapePoder = mysql_1.default.instance.cnn.escape(body.poder);
    const query = `UPDATE heroes SET nombre = ${escapeNombre}, poder = ${escapePoder} WHERE id = ${id}`;
    let datos = {
        nombre: escapeNombre,
        poder: escapePoder
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
router.delete('/heroes/:id', (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM heroes WHERE id = ${id}`;
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
