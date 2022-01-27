const http = require('http');

const app = require('app');
const { port } = require('config/config');

app.set('port', port);

const server = http.createServer(app);
// eslint-disable-next-line no-console
server.on('listening', () => console.log(`server started at port: ${port}`));
server.listen(port);
