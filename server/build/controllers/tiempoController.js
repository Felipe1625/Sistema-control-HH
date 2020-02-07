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
class TiempoController {
    //list -> list all tiempos
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tiempos = yield database_1.default.query('SELECT * FROM tiempo');
            res.json(tiempos);
        });
    }
    //metodo create -> insert tiempo
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const sql=await pool.query('INSERT INTO trabajo set IdOt='+req.body.IdOt+',IdOperador='+req.body.IdOperador+',Fecha=\''+req.body.Fecha+'\',HoraInicio=\''+req.body.HoraInicio+'\',HoraFin=\''+req.body.HoraFin+'\',TotalTiempo=TIMEDIFF(\''+req.body.HoraFin+'\',\''+req.body.HoraInicio+'\')')
            // // console.log(req.body); 
            // res.json(sql.insertId);
            yield database_1.default.query('INSERT INTO tiempo set ?', [req.body]);
            console.log(req.body);
            res.json({ message: 'tiempo saved' });
        });
    }
}
const tiempoController = new TiempoController();
exports.default = tiempoController;
