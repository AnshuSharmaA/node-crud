module.exports = function apiSuccess(resp, data) {
    resp.status(200).json(data);
};