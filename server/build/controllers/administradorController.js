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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//npm install --save @types/jsonwebtoken para usar jsonwebtoken
class AdministradorController {
    //list -> list all administradores
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const administradores = yield database_1.default.query('SELECT IdAdmin,Rut, CONCAT(Nombre,\' \',Apellido) as Nombre from administrador where Habilitado=1'); //consulta async
            res.json(administradores); //la lista queda guardada en administradores, asi que lo mostramos 
        });
    }
    //getOne -> list one administrador
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const administrador = yield database_1.default.query('SELECT * FROM administrador WHERE IdAdmin=?', [req.params.id]); //el id a buscar esta almacenado en req.params.id
            if (administrador.length > 0) {
                return res.json(administrador[0]); //retorna el administrador si lo encuentra por id
            }
            res.status(404).json({ text: 'administrador not founding' }); //mensaje de administrador no encontrado     
        });
    }
    //metodo create -> insert administrador
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO administrador set ?', [req.body]); //para insert, await es espera hasta que termine, ya que el metodo es asincrono
            console.log(req.body); // req.body contiene los datos del cliente, los datos que angular enviara al servidor
            res.json({ message: 'administrador saved' }); //una vez completada la linea anterior, devolvemos un json con mensaje de administrador guardado
        });
    }
    //metodo update -> update a administrador
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('UPDATE administrador set ? WHERE IdAdmin=?', [req.body, req.params.id]);
            res.json({ message: 'updated administrador' }); //req.body tiene los datos a actualizar y req.params.id tiene el id del objeto a actualizar
        });
    }
    //metodo delete -> delete a administrador by logic
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('UPDATE administrador set Habilitado=0 WHERE IdAdmin=?', [req.params.id]);
            res.json({ message: 'administrador removed' });
        });
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rut, password, nombre, apellido } = req.body;
            console.log(rut);
            console.log(password);
            var newUser = {
                rut: rut,
                nombre: nombre,
                apellido: apellido,
                password: password
            };
            const sql = yield database_1.default.query('INSERT INTO administrador set ?', [newUser]);
            let idAdminInsertado = sql.insertId;
            console.log('id: ' + idAdminInsertado);
            const token = jsonwebtoken_1.default.sign({ _id: idAdminInsertado }, 'secretkey');
            console.log('token=' + token);
            res.status(200).json({ token });
            //res.json({message:'adminisatrdor insertado correctamente!'});
        });
    }
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rut, password } = req.body;
            console.log(rut);
            console.log(password);
            var User = {
                IdAdmin: 0,
                Rut: '',
                Nombre: '',
                Apellido: '',
                Password: password,
                Habilitado: 0
            };
            const existe = yield database_1.default.query('SELECT * FROM administrador WHERE Rut=\'' + rut + '\'');
            if (existe.length == 0) {
                //res.json({message:'administrador no esta en la db'})
                return res.status(401).send("El rut no existe");
            }
            else {
                const admin = yield database_1.default.query('SELECT * FROM administrador WHERE Rut=\'' + rut + '\' AND Password=\'' + password + '\'');
                if (admin.length > 0) {
                    User = admin[0];
                    console.log('usuario User= ' + User);
                    console.log('idadmin User= ' + User.IdAdmin);
                    const token = jsonwebtoken_1.default.sign({ _id: User.IdAdmin }, 'secretkey');
                    res.status(200).json({ token });
                    console.log('token= ' + token);
                }
                else {
                    //res.json({message:'password incorrecta'});
                    return res.status(401).send("Contraseña incorrecta");
                }
            }
        });
    }
}
const administradorController = new AdministradorController();
exports.default = administradorController;
