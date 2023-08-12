const express = require('express')
const route = express.Router();
const categoryController = require('../../controllers/category/categoryController');
const authMiddleware = require('../../middleware/authMiddleware');

route.post('/add/category',authMiddleware.authenticateToken,categoryController.store);
route.get('/list/category',authMiddleware.authenticateToken,categoryController.list);


module.exports = route;