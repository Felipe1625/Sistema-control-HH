"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trabajoController_1 = __importDefault(require("../controllers/trabajoController"));
class TrabajoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', trabajoController_1.default.list); //http://localhost:3000/api/trabajo/
        this.router.get('/:id', trabajoController_1.default.getOne); //http://localhost:3000/api/trabajo/10
        this.router.post('/', trabajoController_1.default.create); //http://localhost:3000/api/trabajo/
        // this.router.put('/:id',trabajoController.update);//http://localhost:3000/api/trabajo/10
        this.router.put('/:id', trabajoController_1.default.updateTotalTiempoTrabajo);
        this.router.put('/update/:id', trabajoController_1.default.updateCodigoTrabajo);
    }
}
const trabajoRoutes = new TrabajoRoutes();
exports.default = trabajoRoutes.router;
