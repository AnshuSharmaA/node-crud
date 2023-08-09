const jwt = require('jsonwebtoken');
const apiError = require('../responses/error');
function authenticateToken(req, resp, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        const errorData = {
            'status': false,
            'message': "You are not authorized to access!"
        }
        apiError(resp, errorData)
        
    }

    jwt.verify(token, 'your-secret-key', (err, user) => {
        if (err) {
            const errorData = {
                'status': false,
                'message': "Incorrect email or password!"
            }
            apiError(resp, errorData)
        }
       
        next();
    });
}

module.exports = {
    authenticateToken,
};