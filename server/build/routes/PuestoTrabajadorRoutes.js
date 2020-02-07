"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const puestoTrabajadorController_1 = __importDefault(require("../controllers/puestoTrabajadorController"));
class PuestoTrabajadorRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', puestoTrabajadorController_1.default.list); //http://localhost:3000/api/puestoTrabajador/
        this.router.get('/:id', puestoTrabajadorController_1.default.getOne); //http://localhost:3000/api/puestoTrabajador/10
        this.router.post('/', puestoTrabajadorController_1.default.create); //http://localhost:3000/api/puestoTrabajador/
        this.router.put('/:id', puestoTrabajadorController_1.default.update); //http://localhost:3000/api/puestoTrabajador/10
    }
}
const puestoTrabajadorRoutes = new PuestoTrabajadorRoutes();
exports.default = puestoTrabajadorRoutes.router;
