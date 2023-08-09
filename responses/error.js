module.exports = function apiError(resp, message, statusCode = 400) {
    resp.status(statusCode).json({ error: message });
};