'use strict'

const
    config = require('../../config'),
    redis = require('redis'),
    client = redis.createClient(`${config.redisURL}${config.redisPort}`),
    util = require('util');

client.get = util.promisify(client.get)

const hashSetAsync = async (hash, value) => {
    client.set(hash, value);
}

const hashGetAsync = async (hash) => {
    return client.get(hash);
}

const hashHSetAsync = async (hash, key, value) => {
    client.hset(hash, key, value);
}

module.exports = {
    hashSetAsync,
    hashGetAsync,
    hashHSetAsync,
    client
}