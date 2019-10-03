'use strict'

const
    climaService = require('../services/clima'),
    redisClient = require('../redis/redis');

const insCoords = async (req, res) => {
    try {
        redisClient.hashSetAsync('coords', JSON.stringify(req.body));
        res.status(200).send({
            ok: true
        });
    } catch (error) {
        res.status(500).send({ ok: false, message: error });
    }
}

const getCoords = async () => {
    try {
        let promises = [];
        let ciudades = await redisClient.hashGetAsync('coords');
        ciudades = JSON.parse(ciudades);
        ciudades.forEach(coords => promises.push(climaService.getClima(coords)));
        let result = await Promise.all(promises);
        for (let i = 0; i < ciudades.length; i++) {
            ciudades[i]['clima'] = result[i];
        }
        return ciudades;
    } catch (error) {
        return error
    }
}

module.exports = {
    insCoords,
    getCoords
}