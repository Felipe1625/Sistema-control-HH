"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const otController_1 = __importDefault(require("../controllers/otController"));
class OtRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', otController_1.default.list); //http://localhost:3000/api/ot/
        this.router.get('/:id', otController_1.default.getOne); //http://localhost:3000/api/ot/10
        this.router.post('/', otController_1.default.create); //http://localhost:3000/api/ot/
        this.router.put('/:id', otController_1.default.update); //http://localhost:3000/api/ot/10
        this.router.put('/close/:id', otController_1.default.close); //http://localhost:3000/api/administrador/close/10
        this.router.put('/delete/:id', otController_1.default.delete); //http://localhost:3000/api/administrador/delete/10 
        this.router.get('/searchcode/:id', otController_1.default.searchcode); //http://localhost:3000/api/ot/searchcode/10 
        this.router.get('/getOtByCodigo/:id', otController_1.default.getOtByCodigo); //http://localhost:3000/api/ot/getOtByCodigo/10
        this.router.get('/verificarOt/:id', otController_1.default.verificarExisteOt); //http://localhost:3000/api/ot/searchcode/10 
        this.router.post('/createot/', otController_1.default.creatAndReturnId); //http://localhost:3000/api/ot/
    }
}
const otRoutes = new OtRoutes();
exports.default = otRoutes.router;
