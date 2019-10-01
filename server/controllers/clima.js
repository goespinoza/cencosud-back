'use strict'

const coordsCtrl = require('./coords');

const getClima = async (req, res) => {
    try {
        const result = await coordsCtrl.getCoords();
        res.status(200).send({
            ok: true,
            ciudades: result
        });
    } catch (error) {
        res.status(500).send({ ok: false, message: error });
    }
}

module.exports = {
    getClima
}