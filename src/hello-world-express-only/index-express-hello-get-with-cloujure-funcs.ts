import * as http from 'http';

import app from './app-express-hello-get';
import { normalizePort, onError, onListening } from "../utils/utils";

const server = http.createServer(app);
const port = normalizePort(process.env.port || 3000);

server.listen(port);

// Usando as cloujure functions definidas no ./utils/utils.js
server.on('error', onError(server));
server.on('listening', onListening(server));