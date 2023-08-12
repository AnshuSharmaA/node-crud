const express = require('express')
const route = express.Router()
const authMiddleware = require('../../middleware/authMiddleware');
const upload = require('../../middleware/imageUpload');
const productController = require('../../controllers/product/productController');
/* product routes */
route.post('/add/product', authMiddleware.authenticateToken, productController.store);
route.get('/list/product', authMiddleware.authenticateToken, productController.list);
route.post('/details/product', authMiddleware.authenticateToken, productController.details);
route.put('/update/product', authMiddleware.authenticateToken, productController.update);
/* end */
module.exports = route