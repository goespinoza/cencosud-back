'use strict'

const config = require('../../config'),
    axios = require('axios'),
    redis = require('redis'),
    client = redis.createClient(`${config.redisURL}${config.redisPort}`)

const getClima = async (coords) => {
    try {
        checkIfRequestFailed();
        const { data: result } = await axios.get(`https://api.darksky.net/forecast/${config.configKey.secret}/${coords.lat},${coords.lng}?exclude={minutely,hourly,daily,flags}`);
        return result;
    } catch (error) {
        await client.hset('api.errors', moment().unix(), error.message);
        /* client.hget('api.errors', moment().unix(), (err, val) => {
            console.log('error', val);
        }); */
    }
}

const checkIfRequestFailed = () => {
    if (Math.random() < 0.1) {
        throw new Error('How unfortunate! The API Request Failed')
    }
}

module.exports = {
    getClima
}