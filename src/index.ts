import * as http from 'http';

import app from './app';
import db from './models';
import { normalizePort, onError, onListening } from "./utils/utils";

const server = http.createServer(app);
const port = normalizePort(process.env.port || 3000);

/* Informando que o sequelize deve ser sincronizado com o MySQL.
 * Retorna um bluebird que é uma promessa.
 * 
 * Só vamos subir o servidor depois que o sequelize estiver
 * sincronizado com o MySQL.
 */
db.sequelize.sync()
    .then(() => {
        server.listen(port);

        // Usando as cloujure functions definidas no ./utils/utils.js
        server.on('error', onError(server));
        server.on('listening', onListening(server));
    });