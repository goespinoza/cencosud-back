'use strict'

const
    climaService = require('../services/clima'),
    redisClient = require('../redis/redis'),
    ciudades = require('../../ciudades')

const insCoords = async (req, res) => {
    try {
        ciudades.forEach(ciudad => {
            redisClient.hashSetAsync('ciudad', ciudad.key, `${ciudad.lat},${ciudad.lng}`);
        });
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
        for (let i = 0; i < ciudades.length; i++) {
            const coords = await redisClient.hashGetAsync('ciudad', ciudades[i].key);
            promises.push(await climaService.getClima(coords));
        }
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