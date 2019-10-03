'use strict'

const
    config = require('../../config'),
    axios = require('axios'),
    redisClient = require('../redis/redis'),
    moment = require('moment');


const getClima = async (coords) => {
    try {
        ifRequestFailed();
        const { data: result } = await axios.get(`https://api.darksky.net/forecast/${config.configKey.secret}/${coords}?exclude={minutely,hourly,daily,flags}`);
        return result;
    } catch (error) {
        await redisClient.hashSetAsync('api.errors', moment().unix(), error.message);
    }
}

const ifRequestFailed = () => {
    if (Math.random() < 0.1) {
        throw new Error('How unfortunate! The API Request Failed')
    }
}

module.exports = {
    getClima
}