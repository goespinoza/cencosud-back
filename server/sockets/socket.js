const { io } = require('../../server');
const coordsCtrl = require('../controllers/coords');

io.on('connection', client => {
    console.log('User connected to Socket');

    setInterval(async () => {
        const result = await coordsCtrl.getCoords();
        client.emit('climaCiudades', { ok: true, ciudades: result });
    }, 10000);

    client.on("disconnect", () => {
        console.log("User disconnected from Socket");
    });
})
