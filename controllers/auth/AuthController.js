const User = require('../../models/User')
const register = async (req, resp) => {
    try {
        console.log(req.body);
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        resp.status(201).json(user);
    } catch (error) {
        resp.status(400).json({ message: error.message });
    }
}
module.exports = {register}