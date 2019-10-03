'use strict'

const
    config = require('../../config'),
    redis = require('redis'),
    client = redis.createClient(`${config.redisURL}${config.redisPort}`),
    util = require('util');

client.hget = util.promisify(client.hget)

const hashSetAsync = async (hash, key, value) => {
    client.hset(hash, key, value);
}

const hashGetAsync = async (hash, key) => {
    return client.hget(hash, key);
}

module.exports = {
    hashSetAsync,
    hashGetAsync
}