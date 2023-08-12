const apiSuccess = require('../../responses/success');
const apiError = require('../../responses/error');
const db = require('../../database/database');
const Category = db.Category;
/* Create category api */
const store = async (req, resp) => {
    try {
        const categoryData = {
            name: req.body.name,
        }
        const category = await Category.create(categoryData);
        if (category) {
            const data = {
                'name': category.name,
                'status': true,
                'message': "Product category created sucessfully!"
            }
            apiSuccess(resp, data);
        }
        else {
            const errorData = {
                // 'error': error.message,
                'status': false,
                'message': "Unable to create Category!"
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
/* list category api */
const list = async (req, resp) => {
    try {
        var category_array = await Category.findAll()
        if (category_array) {
            const data = {
                'status': true,
                'message': `Category fetched sucessfully!`,
                'data': category_array,
            }
            apiSuccess(resp, data);
        } else {
            const errorData = {
                'status': false,
                'message': "No Category found!"
            }
            apiError(resp, errorData)
        }
    } catch (error) {
        const errorData = {
            'error': error.message,
            'status': false,
            'message': "Somthing went wrong!"
        }
        apiError(resp, errorData)
    }
}
/* signle category list api */
const details = async (req, resp) => {
    try {
        if (req.body.category_id) {
            var category_array = await Category.findOne({ where: { id: req.body.category_id } })
            if (category_array) {
                const data = {
                    'status': true,
                    'message': `Category fetched sucessfully!`,
                    'data': category_array,
                }
                apiSuccess(resp, data);
            } else {
                const errorData = {
                    'status': false,
                    'message': "No Category found!"
                }
                apiError(resp, errorData)
            }
        }
        else {
            const errorData = {
                'status': false,
                'message': "Category id is required"
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
/* update category  api */
const update = async (req, resp) => {
    try {
        const category = await Category.findByPk(req.body.category_id);
        if (category) {
            const categoryData = {
                name: req.body.name,
            }
            const update_category = await Category.update(categoryData, {
                where: { id: req.body.category_id }
            });
            if (update_category) {
                const updated_category = await Category.findByPk(req.body.category_id);
                const data = {
                    'product': updated_category,
                    'status': true,
                    'message': "Category update sucessfully!"
                }
                apiSuccess(resp, data);
            }
            else {
                const errorData = {
                    // 'error': error.message,
                    'status': false,
                    'message': "Unable to create Category!"
                }
                apiError(resp, errorData)
            }
        }
        else {
            const errorData = {
                // 'error': error.message,
                'status': false,
                'message': "Category id is required"
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