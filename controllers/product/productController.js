const apiSuccess = require('../../responses/success');
const apiError = require('../../responses/error');
const db = require('../../database/database');
const Product = db.Product;
const Category = db.Category;
/* Create product api */
const store = async (req, resp) => {
    try {
        const productData = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            quantity: req.body.quantity,
            category_id: req.body.category_id,
            product_image: req.file.filename,
        }
        const product = await Product.create(productData);
        if (product) {
            const result = {
                "id": product.id,
                "name": product.name,
                "price": product.price,
                "description": product.description,
                "quantity": product.quantity,
                "category_id": product.category_id,
                "product_image": product.getProductImageURL(),
            }
            const data = {
                'product': result,
                'status': true,
                'message': "Product created sucessfully!"
            }
            apiSuccess(resp, data);
        }
        else {
            const errorData = {
                // 'error': error.message,
                'status': false,
                'message': "Unable to create Product!"
            }
            apiError(resp, errorData)
        }
    } catch (error) {
        const errorData = {
            'error': error.message,
            'status': false,
            // 'message': "Unable to create Category!"
        }
        apiError(resp, errorData)
    }
}
/* list product api */
const list = async (req, resp) => {
    try {
        const protocol = req.protocol;
        const hostname = req.get('host');
        var product_array = await Product.findAll({
            attributes: ['id', 'name', 'price', 'quantity', 'description', 'category_id', 'product_image'],
            include: [{
                model: Category,
                attributes: ['name']
            }]
        });

        // Apply the accessor to each product
        for (const product of product_array) {
            product.dataValues.product_image_url = product.getProductImageURL(protocol, hostname); // Call the accessor method
        }
        if (product_array) {

            const data = {
                'status': true,
                'message': `Products fetched sucessfully!`,
                'data': product_array,
            }
            apiSuccess(resp, data);
        } else {
            const errorData = {
                'status': false,
                'message': "No Products found!"
            }
            apiError(resp, errorData)
        }
    } catch (error) {
        const errorData = {
            'error': error.message,
            'status': false,
        }
        apiError(resp, errorData)
    }
}
/* signle product list api */
const details = async (req, resp) => {
    try {
        const protocol = req.protocol;
        const hostname = req.get('host');
        if (req.body.product_id) {
            var product_array = await Product.findOne({
                where: { id: req.body.product_id },
                attributes: ['id', 'name', 'price', 'quantity', 'description', 'category_id', 'product_image'],
                include: [{
                    model: Category,
                    attributes: ['name']
                }]
            })
            // Apply the accessor to each product
         
            if (product_array) {
                product_array.dataValues.product_image_url = product_array.getProductImageURL(protocol, hostname);
                const data = {
                    'status': true,
                    'message': `Products fetched sucessfully!`,
                    'data': product_array,
                }
                apiSuccess(resp, data);
            } else {
                const errorData = {
                    'status': false,
                    'message': "No Products found!"
                }
                apiError(resp, errorData)
            }
        }
        else {
            const errorData = {
                'status': false,
                'message': "Product id is required"
            }
            apiError(resp, errorData)
        }
    } catch (error) {
        const errorData = {
            'error': error.message,
            'status': false,
        }
        apiError(resp, errorData)
    }
}
/* update product api */
const update = async (req, resp) => {
    try {
        const product = await Product.findByPk(req.body.product_id);
        if (product) {
            const productData = {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                quantity: req.body.quantity,
                category_id: req.body.category_id,
            }
            const update_product = await Product.update(productData, {
                where: { id: req.body.product_id }
            });
            if (update_product) {
                const updated_product = await Product.findByPk(req.body.product_id);
                const data = {
                    'product': updated_product,
                    'status': true,
                    'message': "Product update sucessfully!"
                }
                apiSuccess(resp, data);
            }
            else {
                const errorData = {
                    // 'error': error.message,
                    'status': false,
                    'message': "Unable to create Product!"
                }
                apiError(resp, errorData)
            }
        }
        else {
            const errorData = {
                // 'error': error.message,
                'status': false,
                'message': "Product id is required"
            }
            apiError(resp, errorData)
        }
    } catch (error) {
        const errorData = {
            'error': error.message,
            'status': false,
            // 'message': "Unable to create Category!"
        }
        apiError(resp, errorData)
    }
}
module.exports = { store, list, details, update }