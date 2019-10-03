const { io } = require('../../server');
const coordsCtrl = require('../controllers/coords');

io.on('connection', client => {
    console.log('User connected to Socket');

    /* SE DEBE DEJAR COMENTADO, SOLO PARA PRUEBA */
    /* client.on('obtenerCiudades', async (callback) => {
        const result = await coordsCtrl.getCoords();
        callback(result);
    }); */

    /* DESCOMENTAR */
    setInterval(async () => {
        const result = await coordsCtrl.getCoords();
        client.emit('climaCiudades', result);
    }, 10000);

    client.on("disconnect", () => {
        console.log("User disconnected from Socket");
    });
})
