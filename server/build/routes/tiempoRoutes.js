"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tiempoController_1 = __importDefault(require("../controllers/tiempoController"));
class TiempoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', tiempoController_1.default.list); //http://localhost:3000/api/tiempo/     
        this.router.post('/', tiempoController_1.default.create); //http://localhost:3000/api/trabajo/
    }
}
const tiempoRoutes = new TiempoRoutes();
exports.default = tiempoRoutes.router;
