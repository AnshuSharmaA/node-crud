const express = require('express')
const route = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const AuthController = require('../../controllers/auth/AuthController');
route.post('/register',AuthController.register);
route.post('/login',AuthController.login);
route.get('/users',authMiddleware,AuthController.users);
module.exports = route