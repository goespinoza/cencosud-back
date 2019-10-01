'use strict'

const express = require('express');
const climaCtrl = require('../controllers/clima');
const coordsCtrl = require('../controllers/coords');

const api = express.Router();

/* GET */
api.get('/public/get-clima', climaCtrl.getClima);

/* POST */
api.post('/public/ins-coords', coordsCtrl.insCoords);

module.exports = api;