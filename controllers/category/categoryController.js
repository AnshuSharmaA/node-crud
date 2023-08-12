const apiSuccess = require('../../responses/success');
const apiError = require('../../responses/error');
const db = require('../../database/database');
const Category = db.Category;

const store = async(req,resp)=>{
    try {
        const categoryData = {
            name: req.body.name,

        }
        const category = await Category.create(categoryData);
        const data = {
            'name': category.name,
            'status': true,
            'message': "Product category created sucessfully!"
        }
        apiSuccess(resp, data);
    } catch (error) {
        const errorData = {
            'error': error.message,
            'status': false,
            // 'message': "Unable to create Category!"
        }
        apiError(resp, errorData)
    }
}
const list = async (req,resp)=>{
    try {
        var category_array = await Category.findAll()
        if(category_array)
        {
            const data = {
                'status': true,
                'message': `Category fetched sucessfully!`,
                'data':category_array,
            }
            apiSuccess(resp, data);
        }else
        {
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

module.exports = {store,list}