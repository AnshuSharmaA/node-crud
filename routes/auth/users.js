const express = require('express')
const route = express.Router();
const AuthController = require('../../controllers/auth/AuthController');
route.get('/register',AuthController.register);

module.exports = route