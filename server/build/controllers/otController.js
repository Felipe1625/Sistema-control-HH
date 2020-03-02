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
class OtController {
    //list -> list all ot
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const ots=await pool.query('SELECT IdOt,Codigo,HorasPresupuestadas,HorasTrabajadas,SUBSTRING_INDEX(timediff(HorasPresupuestadas,HorasTrabajadas),\'\.\',1) as Balance FROM ot WHERE Activa=1'); 
            const ots = yield database_1.default.query('SELECT o.IdOt as IdOt,o.Codigo as Codigo,o.HorasPresupuestadas as HorasPresupuestadas,SUBSTRING_INDEX(SEC_TO_TIME(SUM(TIME_TO_SEC(t.TotalTiempo))),\'\.\', 1) AS HorasTrabajadas,SUBSTRING_INDEX(timediff(HorasPresupuestadas,SUBSTRING_INDEX(SEC_TO_TIME(SUM(TIME_TO_SEC(t.TotalTiempo))), \'\.\', 1)),\'\.\',1) as Balance from ot o INNER join trabajo t on o.IdOt=t.IdOt GROUP by t.IdOt');
            res.json(ots);
        });
    }
    //getOne -> list one ot
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ot = yield database_1.default.query('SELECT * FROM ot WHERE IdOt=?', [req.params.id]);
            if (ot.length > 0) {
                return res.json(ot[0]);
            }
            res.status(404).json({ text: 'ot not founding' });
        });
    }
    //metodo create -> insert ot
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO ot set ?', [req.body]);
            res.json({ message: 'ot saved' });
        });
    }
    //metodo create -> insert ot
    creatAndReturnId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('-------');
            console.log('-------');
            console.log('-------');
            console.log('-------');
            console.log(req.body);
            console.log('-------');
            console.log('-------');
            console.log('-------');
            console.log('-------');
            const sql = yield database_1.default.query('INSERT INTO ot set ?', [req.body]);
            res.json(sql.insertId);
        });
    }
    //metodo update -> update a ot
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('UPDATE ot set ? WHERE IdOt=?', [req.body, req.params.id]);
            yield res.json({ message: 'ot updating' });
        });
    }
    //metodo close -> close ot
    close(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('UPDATE ot set Activa=0 WHERE IdOt=?', [req.params.id]);
            res.json({ message: 'ot close' });
        });
    }
    //metodo delete -> delete ot by logic
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('UPDATE ot set Habilitado=0 WHERE IdOt=?', [req.params.id]);
            res.json({ message: 'ot removed' });
        });
    }
    searchcode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('metodo searchcode de ot controller, codigo: ' + [req.params.id]);
            const ot = yield database_1.default.query('SELECT * FROM ot WHERE codigo=?', [req.params.id]);
            if (ot.length > 0) {
                console.log('la ot existe: ');
                console.log(ot.IdOt);
                return res.json('existe');
            }
            else {
                console.log('la ot no existe: ');
                console.log(ot);
                return res.json('no existe');
            }
        });
    }
    getOtByCodigo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ot = yield database_1.default.query('SELECT * FROM ot WHERE Codigo=?', [req.params.id]);
            if (ot.length > 0) {
                return res.json(ot[0]);
            }
            res.status(404).json({ text: 'ot not founding' });
        });
    }
    verificarExisteOt(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('metodo verificarExisteOt de ot controller, codigo: ' + [req.params.id]);
            const ot = yield database_1.default.query('SELECT * FROM ot WHERE codigo=?', [req.params.id]);
            if (ot.length > 0) {
                console.log('la ot existe: ');
                console.log(ot[0].IdOt);
                return res.json(ot[0].IdOt);
            }
            else {
                console.log('la ot no existe: ');
                console.log(ot);
                return res.json('no existe');
            }
        });
    }
}
const otController = new OtController();
exports.default = otController;
