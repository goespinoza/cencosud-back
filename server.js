'use strict'

const
    config = require('./config'),
    express = require('express'),
    app = express(),
    socketIO = require('socket.io'),
    http = require('http'),
    server = http.createServer(app),
    redis = require('redis'),
    client = redis.createClient(`${config.redisURL}${config.redisPort}`),
    cors = require('cors'),
    api = require('./server/routes/index'),
    bodyParser = require('body-parser')

app.use(cors(config.optionCors));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/cencosud-api', api);

app.listen(config.port, () => {
    console.log(`Estoy escuchando en el puerto: ${config.port}`);
})

client.on('connect', () => {
    console.log(`Conectado a redis en el puerto: ${config.redisPort}`);
});

client.on('error', err => {
    console.log(`Error en redis: ${err}`);
});

server.listen(config.socketPort, () => {
    console.log(`Estoy escuchando Socket en el puerto: ${config.socketPort}`);
});

// IO = esta es la comunicacion del backend
module.exports.io = socketIO(server);
require('./server/sockets/socket');

module.exports = { app }
