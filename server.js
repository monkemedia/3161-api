const http = require('http');
const app = require('./app');

const port = process.env.PORT || 4000;

const server = http.createServer(app);

console.log('Running on port: ', port)
server.listen(port);