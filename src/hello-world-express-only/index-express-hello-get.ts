// Index de um servidor HTTP comum, escutando na porta 3000
import * as http from 'http';

import app from './app-express-hello-get';

const server = http.createServer(app);

server.listen(3000);
server.on('listening', () => console.log('Listening on port 3000...'));