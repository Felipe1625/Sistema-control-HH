"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pausaController_1 = __importDefault(require("../controllers/pausaController"));
class PausaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', pausaController_1.default.list); //http://localhost:3000/api/pausa/
        this.router.get('/:id', pausaController_1.default.getOne); //http://localhost:3000/api/pausa/10
        this.router.post('/', pausaController_1.default.create); //http://localhost:3000/api/pausa/
        this.router.put('/:id', pausaController_1.default.update); //http://localhost:3000/api/pausa/10
    }
}
const pausaRoutes = new PausaRoutes();
exports.default = pausaRoutes.router;
