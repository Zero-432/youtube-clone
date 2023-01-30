"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const users_1 = __importDefault(require("./users"));
const videos_1 = __importDefault(require("./videos"));
const comments_1 = __importDefault(require("./comments"));
function routes(app) {
    /** Healthcheck */
    app.get('/healthcheck', (req, res) => res.status(200).json({ hello: 'world' }));
    /** Authentication */
    app.use('/api/auth', auth_1.default);
    app.use('/api/users', users_1.default);
    /** Video */
    app.use('/api/videos', videos_1.default);
    /** Commnents */
    app.use('/api/comments', comments_1.default);
}
exports.default = routes;
