"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const administradorController_1 = __importDefault(require("../controllers/administradorController"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let User = require('../models/User'); //agregamos esto
class AdministradorRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', administradorController_1.default.list); //http://localhost:3000/api/administrador/
        this.router.get('/:id', administradorController_1.default.getOne); //http://localhost:3000/api/administrador/10
        this.router.post('/', administradorController_1.default.create); //http://localhost:3000/api/administrador/
        this.router.put('/:id', administradorController_1.default.update); //http://localhost:3000/api/administrador/10
        this.router.put('/delete/:id', administradorController_1.default.delete); //http://localhost:3000/api/administrador/delete/10
        this.router.post('/signup', administradorController_1.default.signup);
        this.router.post('/signin', administradorController_1.default.signin);
        this.router.get('/return/private-tasks', verifyToken, (req, res) => {
            res.json([
                {
                    _id: 1,
                    task_name: 'task 1'
                },
                {
                    _id: 2,
                    task_name: 'task 2'
                }
            ]);
        });
        this.router.get('/bla/blabla', verifyToken, (req, res) => {
            console.log(req.userId);
        });
    }
}
const administradorRoutes = new AdministradorRoutes();
exports.default = administradorRoutes.router;
function verifyToken(req, res, next) {
    console.log(req.headers.authorization);
    //en el header viene el authorization, que es el token, si es undefined es porque no viene nada, o sea, no esta logueado, si viene algo, se tiene que comprobar que es un token valido
    if (!req.headers.authorization) {
        //si no viene algo en el authorization
        return res.status(401).send('unauthorized request');
    }
    const token = req.headers.authorization.split(' ')[1];
    //dividimos el req en 2 , por que despues del espacio esta el token como tal
    console.log(token);
    if (token == null) { // si el token que viene es nulo, retornamos el mensaje de solicitud no autorizada
        return res.status(401).send('unauthorized request');
    }
    console.log('error');
    const payload = jsonwebtoken_1.default.verify(token, 'secretkey');
    //ejemplo de token=  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjE2LCJpYXQiOjE1NzcyOTE4MTB9.mE-duTHebllE1LhYFjDqPVoI21JzBzjAqhqnKfqlO2o
    console.log(payload); //aqui tenemos 2 datos , el id y iat, el id es lo unico importante 
    req.userId = payload._id;
    next();
}
