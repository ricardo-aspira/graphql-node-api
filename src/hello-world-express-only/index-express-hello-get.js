"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Index de um servidor HTTP comum, escutando na porta 3000
const http = require("http");
const app_express_hello_get_1 = require("./app-express-hello-get");
const server = http.createServer(app_express_hello_get_1.default);
server.listen(3000);
server.on('listening', () => console.log('Listening on port 3000...'));
