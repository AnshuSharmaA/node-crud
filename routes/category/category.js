const express = require('express')
const route = express.Router();
const categoryController = require('../../controllers/category/categoryController');
const authMiddleware = require('../../middleware/authMiddleware');
/* Category route */
route.post('/add/category', authMiddleware.authenticateToken, categoryController.store);
route.get('/list/category', authMiddleware.authenticateToken, categoryController.list);
route.post('/details/category', authMiddleware.authenticateToken, categoryController.details);
route.put('/update/category', authMiddleware.authenticateToken, categoryController.update);
/* end */
module.exports = route;