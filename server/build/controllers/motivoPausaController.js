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
class MotivoPausaController {
    //list -> list all motivopausa
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const motivopausas = yield database_1.default.query('SELECT * FROM motivopausa');
            res.json(motivopausas);
        });
    }
    //getOne -> list one motivopausa
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const motivopausa = yield database_1.default.query('SELECT * FROM motivopausa WHERE IdMotivoPausa=?', [req.params.id]);
            if (motivopausa.length > 0) {
                return res.json(motivopausa[0]);
            }
            res.status(404).json({ text: 'motivopausa not founding' });
        });
    }
    //metodo create -> insert motivopausa
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO motivopausa set ?', [req.body]);
            console.log(req.body);
            res.json({ message: 'motivopausa saved' });
        });
    }
    //metodo update -> update a motivopausa
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('UPDATE motivopausa set ? WHERE IdMotivoPausa=?', [req.body, req.params.id]);
            res.json({ message: 'motivopausa updating' });
        });
    }
}
const motivoPausaController = new MotivoPausaController();
exports.default = motivoPausaController;
