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
class TrabajoController {
    //list -> list all trabajos 
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const trabajos = yield database_1.default.query('SELECT IdTrabajo,o.IdOt as IdOt,o.Codigo as Codigo,CONCAT(op.Nombre,\' \',op.Apellido) as Nombre,Fecha,HoraInicio,HoraFin,TotalTiempo FROM trabajo t inner join ot o on o.IdOt=t.IdOt inner join operador op on op.IdOperador=t.IdOperador WHERE o.ACTIVA=1');
            res.json(trabajos);
            console.log(trabajos);
        });
    }
    //getOne -> list one trabajo
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const trabajo = yield database_1.default.query('SELECT * FROM trabajo WHERE IdTrabajo=?', [req.params.id]);
            if (trabajo.length > 0) {
                return res.json(trabajo[0]);
            }
            res.status(404).json({ text: 'trabajo not founding' });
        });
    }
    //metodo create -> insert trabajo
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = yield database_1.default.query('INSERT INTO trabajo set IdOt=' + req.body.IdOt + ',IdOperador=' + req.body.IdOperador + ',Fecha=\'' + req.body.Fecha + '\',HoraInicio=\'' + req.body.HoraInicio + '\',HoraFin=\'' + req.body.HoraFin + '\',TotalTiempo=TIMEDIFF(\'' + req.body.HoraFin + '\',\'' + req.body.HoraInicio + '\')');
            // console.log(req.body); 
            console.log('sql data retornada: ' + sql);
            res.json(sql.insertId);
        });
    }
    //metodo update -> update a trabajo
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('req es: ' + req.body);
            // await pool.query('UPDATE trabajo set ? WHERE IdTrabajo=?',[req.params,req.params.id]);
            // res.json({message:'trabajo updating'});
        });
    }
    updateTotalTiempoTrabajo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('req body: ' + req.body);
            console.log('req id: ' + req.params.id);
            console.log('UPDATE trabajo set ? WHERE IdTrabajo=?', [req.body, req.params.id]);
            yield database_1.default.query('UPDATE trabajo set ? WHERE IdTrabajo=?', [req.body, req.params.id]);
            //await pool.query('UPDATE ot set ? WHERE IdOt=?',[req.body,req.params.id]);
            res.json({ message: 'trabajo updating' });
        });
    }
    updateCodigoTrabajo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('req body: ' + req.body);
            console.log('req id: ' + req.params.id);
            console.log('UPDATE trabajo set ? WHERE IdTrabajo=?', [req.body, req.params.id]);
            yield database_1.default.query('UPDATE trabajo set ? WHERE IdTrabajo=?', [req.body, req.params.id]);
            //await pool.query('UPDATE ot set ? WHERE IdOt=?',[req.body,req.params.id]);
            res.json({ message: 'trabajo updating' });
        });
    }
}
const trabajoController = new TrabajoController();
exports.default = trabajoController;
