

const apiSuccess = require('../../responses/success');
const apiError = require('../../responses/error');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../database/database');
const User = db.User;
const UserDetails = db.UserDetails;
/* register api */
const register = async (req, resp) => {
    try {
        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }
        const user = await User.create(userData);
        const userDetailsData = {
            address: req.body.address,
            mobile: req.body.mobile,
            profile_image: req.body.profile_image,
            user_id: user.id
        }
        const userDetail = await UserDetails.create(userDetailsData)
        const data = {
            'name': user.name,
            'email': user.email,
            'user_details': {
                'mobile': userDetail.mobile,
                'address': userDetail.mobile,
                'profile_image': userDetail.profile,
            },
            'status': true,
            'message': "User created sucessfully!"
        }
        apiSuccess(resp, data);
    } catch (error) {
        const errorData = {
            'error': error.message,
            'status': false,
            'message': "Unable to create user!"
        }
        apiError(resp, errorData)
    }
}

/* Login api */
const login = async (req, resp) => {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            const errorData = {
                'status': false,
                'message': "User not found.!"
            }
            apiError(resp, errorData)
        }
        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            const errorData = {
                'status': false,
                'message': "Invalid password!"
            }
            apiError(resp, errorData)
        }
        else {
            // Generate JWT token
            const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });
            const data = {
                'status': true,
                'name': user.name,
                'message': `${user.name} loggedIn sucessfully!`,
                'token': token
            }
            apiSuccess(resp, data);
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
const users = async (req, resp) => {
    try {
        var users_array = await User.findAll({
            attributes:['name','email'],
            include:[{
                model:UserDetails,
                attributes:['address','mobile','profile_image']
            }]
        })
        const data = {
            'status': true,
            'message': `sucessfully!`,
            'data':users_array,
        }
        apiSuccess(resp, data);
    } catch (error) {
        const errorData = {
            'error': error.message,
            'status': false,
            'message': "Somthing went wrong!"
        }
        apiError(resp, errorData)
    }
}
module.exports = { register, login, users }