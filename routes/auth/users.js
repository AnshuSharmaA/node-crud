const express = require('express')
const route = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const AuthController = require('../../controllers/auth/AuthController');
/* Auth routes  */
route.post('/register', AuthController.register);
route.post('/login', AuthController.login);
route.get('/users', authMiddleware.authenticateToken, AuthController.users);
/* end */
module.exports = route