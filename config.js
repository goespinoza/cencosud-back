module.exports = {
    port: process.env.PORT || 3000,
    socketPort: 5000,
    redisPort: 6379,
    redisURL: 'redis://127.0.0.1:',
    configKey: {
        secret: '16b30a277d617f3b9618aac7eca6f7c7'
    },
    optionCors: {
        "origin": "http://localhost:4200",
        "credentials": true,
        "preflightContinue": false,
        "optionsSuccessStatus": 200
    }
}