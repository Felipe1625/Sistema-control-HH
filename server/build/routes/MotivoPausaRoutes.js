"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const motivoPausaController_1 = __importDefault(require("../controllers/motivoPausaController"));
class MotivoPausaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', motivoPausaController_1.default.list); //http://localhost:3000/api/motivoPausa/
        this.router.get('/:id', motivoPausaController_1.default.getOne); //http://localhost:3000/api/motivoPausa/10
        this.router.post('/', motivoPausaController_1.default.create); //http://localhost:3000/api/motivoPausa/
        this.router.put('/:id', motivoPausaController_1.default.update); //http://localhost:3000/api/motivoPausa/10
    }
}
const motivoPausaRoutes = new MotivoPausaRoutes();
exports.default = motivoPausaRoutes.router;
