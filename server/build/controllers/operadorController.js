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
class OperadorController {
    //list -> list all Operador
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const operadores = yield database_1.default.query('SELECT IdOperador,o.IdPuestoTrabajador, Descripcion, Rut,CONCAT(Nombre,\' \',Apellido) as Nombre,o.Password FROM operador o INNER JOIN puestotrabajador p ON o.IdPuestoTrabajador = p.IdPuestoTrabajador WHERE Habilitado=1 ORDER BY Apellido');
            res.json(operadores);
        });
    }
    //getOne -> list one Operador
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const operador = yield database_1.default.query('SELECT IdOperador,o.IdPuestoTrabajador, Descripcion, Rut, Nombre, Apellido,Password FROM operador o INNER JOIN puestotrabajador p ON o.IdPuestoTrabajador = p.IdPuestoTrabajador WHERE IdOperador=?', [req.params.id]);
            if (operador.length > 0) {
                return res.json(operador[0]);
            }
        });
    }
    //metodo create -> insert Operador
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO operador set ?', [req.body]);
            console.log(req.body);
            res.json({ message: 'Operador saved' });
        });
    }
    //metodo update -> update a Operador
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('UPDATE operador set ? WHERE IdOperador=?', [req.body, req.params.id]);
            res.json({ message: 'Operador updating' });
        });
    }
    //metodo delete -> delete a operador by logic
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('UPDATE operador set Habilitado=0 WHERE IdOperador=?', [req.params.id]);
            res.json({ message: 'operador removed' });
        });
    }
    //metodo listPuestosTrabajador -> list puestotrabajador
    listPuestosTrabajador(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const puestotrabajadores = yield database_1.default.query('SELECT * FROM puestotrabajador');
            res.json(puestotrabajadores);
        });
    }
}
const operadorController = new OperadorController();
exports.default = operadorController;
