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
class PausaController {
    //list -> list all pausa
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pausas = yield database_1.default.query('SELECT o.Codigo as Codigo,CONCAT(op.Nombre,\' \',op.Apellido) as Nombre,m.Descripcion as Motivo,p.Fecha,p.HoraInicio,p.HoraFin,p.TotalTiempo FROM pausa p inner join trabajo t on t.IdTrabajo=p.IdTrabajo inner join operador op on op.IdOperador=t.IdOperador inner join ot o on o.IdOt=t.IdOt inner join motivopausa m on m.IdMotivoPausa=p.IdMotivoPausa WHERE o.ACTIVA=1');
            res.json(pausas);
        });
    }
    //getOne -> list one pausa
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pausa = yield database_1.default.query('SELECT * FROM pausa WHERE IdPausa=?', [req.params.id]);
            if (pausa.length > 0) {
                return res.json(pausa[0]);
            }
            res.status(404).json({ text: 'pausa not founding' });
        });
    }
    //metodo create -> insert pausa
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO pausa set ?', [req.body]);
            console.log(req.body);
            res.json({ message: 'pausa saved' });
        });
    }
    //metodo update -> update a pausa
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('UPDATE pausa set ? WHERE IdPausa=?', [req.body, req.params.id]);
            res.json({ message: 'pausa updating' });
        });
    }
}
const pausaController = new PausaController();
exports.default = pausaController;
