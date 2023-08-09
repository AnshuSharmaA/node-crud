const User = require('../../models/User');
const UserDetails = require('../../models/UserDetails');
const apiSuccess = require('../../responses/success');
const apiError = require('../../responses/error');

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
            user_id:user.id
        }
        const userDetail = await UserDetails.create(userDetailsData)
        const data = {
            'name':user.name,
            'email':user.email,
            'user_details':{
                'mobile':userDetail.mobile,
                'address':userDetail.mobile,
                'profile_image':userDetail.profile,
            },
            'status':true,
            'message':"User created sucessfully!"
        }
        apiSuccess(resp,data);
       
        resp.status(201).json();
    } catch (error) {
        resp.status(400).json({ message: error.message });
    }
}
module.exports = { register }