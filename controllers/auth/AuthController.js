const User = require('../../models/User')
exports.register = async (req, resp) => {
    try {
        const user =  await User.find();
        console.log(user);
    } catch (error) {
        console.log(error);
    }
} 