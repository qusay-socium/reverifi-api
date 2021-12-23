const http = require('http');

const app = require('app');
const { port } = require('config/config');

app.set('port', port);

const server = http.createServer(app);
server.on('listening', () => console.log(`server started at port: ${port}`));
server.listen(port);
