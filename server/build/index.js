"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const administradorRoutes_1 = __importDefault(require("./routes/administradorRoutes"));
const MotivoPausaRoutes_1 = __importDefault(require("./routes/MotivoPausaRoutes"));
const OperadorRoutes_1 = __importDefault(require("./routes/OperadorRoutes"));
const OtRoutes_1 = __importDefault(require("./routes/OtRoutes"));
const PausaRoutes_1 = __importDefault(require("./routes/PausaRoutes"));
const PuestoTrabajadorRoutes_1 = __importDefault(require("./routes/PuestoTrabajadorRoutes"));
const TrabajoRoutes_1 = __importDefault(require("./routes/TrabajoRoutes"));
const body_parser_1 = require("body-parser");
const TiempoRoutes_1 = __importDefault(require("./routes/TiempoRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(body_parser_1.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/administrador', administradorRoutes_1.default);
        this.app.use('/api/motivoPausa', MotivoPausaRoutes_1.default);
        this.app.use('/api/operador', OperadorRoutes_1.default);
        this.app.use('/api/ot', OtRoutes_1.default);
        this.app.use('/api/pausa', PausaRoutes_1.default);
        this.app.use('/api/puestoTrabajador', PuestoTrabajadorRoutes_1.default);
        this.app.use('/api/trabajo', TrabajoRoutes_1.default);
        this.app.use('/api/tiempo', TiempoRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port ', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
