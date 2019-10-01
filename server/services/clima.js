'use service'

const axios = require('axios');

const getClima = async (element) => {
    try {
        const { data: result } = await axios.get(`https://api.darksky.net/forecast/16b30a277d617f3b9618aac7eca6f7c7/${element.lat},${element.lng}?exclude={minutely,hourly,daily,flags}`);
        return result;
    } catch (error) {
        // throw new Error(`Error: ${error}`);
        return error;
    }
}

module.exports = {
    getClima
}