'use strict'

const
    config = require('../../config'),
    redis = require('redis'),
    client = redis.createClient(`${config.redisURL}${config.redisPort}`),
    climaService = require('../services/clima'),
    util = require('util')

client.get = util.promisify(client.get)

const insCoords = async (req, res) => {
    try {
        client.set('coords', JSON.stringify(req.body));
        res.status(200).send({
            ok: true
        });
    } catch (error) {
        res.status(500).send({ ok: false, message: error });
    }
}

const getCoords = async () => {
    try {
        let result;
        let promises = [];
        let ciudades = await client.get('coords');
        ciudades = JSON.parse(ciudades);
        ciudades.forEach(ciudad => promises.push(climaService.getClima(ciudad)));
        result = await Promise.all(promises);
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