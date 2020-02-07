"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const operadorController_1 = __importDefault(require("../controllers/operadorController"));
class OperadorRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', operadorController_1.default.list); //http://localhost:3000/api/operador/
        this.router.get('/:id', operadorController_1.default.getOne); //http://localhost:3000/api/operador/10
        this.router.post('/', operadorController_1.default.create); //http://localhost:3000/api/operador/
        this.router.put('/:id', operadorController_1.default.update); //http://localhost:3000/api/operador/10
        this.router.put('/delete/:id', operadorController_1.default.delete); //http://localhost:3000/api/operador/delete/10
        this.router.get('/puestos', operadorController_1.default.listPuestosTrabajador); //http://localhost:3000/api/operador/puestos
    }
}
const operadorRoutes = new OperadorRoutes();
exports.default = operadorRoutes.router;
