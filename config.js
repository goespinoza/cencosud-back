module.exports = {
    port: process.env.PORT || 3000,
    socketPort: 5000,
    redisPort: 6379,
    redisURL: 'redis://127.0.0.1:',
    configKey: {
        secret1: '16b30a277d617f3b9618aac7eca6f7c7',
        secret2: '1f6b5a82ccb24b5aa2e316a93e840036'
    },
    optionCors: {
        "origin": "http://localhost:4200",
        "credentials": true,
        "preflightContinue": false,
        "optionsSuccessStatus": 200
    }
}