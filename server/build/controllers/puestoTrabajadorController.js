"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class PuestoTrabajadorController {
    //list -> list all puestotrabajador
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const puestotrabajadores = yield database_1.default.query('SELECT * FROM puestotrabajador');
            res.json(puestotrabajadores);
        });
    }
    //getOne -> list one puestotrabajador
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const puestotrabajador = yield database_1.default.query('SELECT * FROM puestotrabajador WHERE IdPuestoTrabajador=?', [req.params.id]);
            if (puestotrabajador.length > 0) {
                return res.json(puestotrabajador[0]);
            }
            res.status(404).json({ text: 'puestotrabajador not founding' });
        });
    }
    //metodo create -> insert puestotrabajador
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO puestotrabajador set ?', [req.body]);
            console.log(req.body);
            res.json({ message: 'puestotrabajador saved' });
        });
    }
    //metodo update -> update a puestotrabajador
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('UPDATE puestotrabajador set ? WHERE IdPuestoTrabajador=?', [req.body, req.params.id]);
            res.json({ message: 'puestotrabajador updating' });
        });
    }
}
const puestoTrabajadorController = new PuestoTrabajadorController();
exports.default = puestoTrabajadorController;
