'use service'
const config = require('../../config')
const axios = require('axios');

const getClima = async (element) => {
    try {
        const { data: result } = await axios.get(`https://api.darksky.net/forecast/${config.configKey.secret}/${element.lat},${element.lng}?exclude={minutely,hourly,daily,flags}`);
        return result;
    } catch (error) {
        // throw new Error(`Error: ${error}`);
        return error;
    }
}

module.exports = {
    getClima
}