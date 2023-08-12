const apiSuccess = require('../../responses/success');
const apiError = require('../../responses/error');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../database/database');
const User = db.User;
const UserDetails = db.UserDetails;
require('dotenv').config()
/* register api */
const register = async (req, resp) => {
    try {
        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            user_role: 2,
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
            const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '10h' });
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
/* get all the users */
const users = async (req, resp) => {
    try {
        const protocol = req.protocol;
        const hostname = req.get('host');
        var users_array = await User.findAll({
            attributes: ['name', 'email'],
            include: [{
                model: UserDetails,
                attributes: ['address', 'mobile', 'profile_image']
            }]
        })
        // Apply the accessor to each product
        for (const user of users_array) {
            user.dataValues.user_image_url = user.getUserImageURL(protocol, hostname); // Call the accessor method
        }
        const data = {
            'status': true,
            'message': `sucessfully!`,
            'data': users_array,
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
/* get the single users */
const details = async (req, resp) => {
    try {
        const protocol = req.protocol;
        const hostname = req.get('host');
        if (req.body.user_id) {
            var user = await User.findOne({
                where: { id: req.body.user_id },
                attributes: ['name', 'email'],
                include: [{
                    model: UserDetails,
                    attributes: ['address', 'mobile', 'profile_image']
                }]
            })
            // Apply the accessor to each product

            if (user) {
                user.dataValues.user_image_url = user.getUserImageURL(protocol, hostname);
                const data = {
                    'status': true,
                    'message': `Users fetched sucessfully!`,
                    'data': user,
                }
                apiSuccess(resp, data);
            } else {
                const errorData = {
                    'status': false,
                    'message': "No Users found!"
                }
                apiError(resp, errorData)
            }
        }
        else {
            const errorData = {
                'status': false,
                'message': "User id is required"
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
module.exports = { register, login, users, details }