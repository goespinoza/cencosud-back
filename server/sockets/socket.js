const { io } = require('../../server');
const coordsCtrl = require('../controllers/coords');

io.on('connection', client => {
    console.log('Conectado a Socket');

    client.on('obtenerCiudades', async (callback) => {
        const result = await coordsCtrl.getCoords();
        callback(result);
    });

    /* setInterval(async () => {
        const result = await coordsCtrl.getCoords()
        client.emit('climaCiudades', result);
    }, 10000); */
})
