const express = require('express')
const route = express.Router();
const AuthController = require('../../controllers/auth/AuthController');
route.post('/register',AuthController.register);

module.exports = route