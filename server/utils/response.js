const sendSuccess = (res, statusCode, message, payload) => {
    return res.status(statusCode).json({
        succes: true,
        message,
        payload
    });
};

const sendError = (res, statusCode, message) => {
    return res.status(statusCode).json({
        succes: false,
        message,
        payload: null
    });
};

module.exports = { sendSuccess, sendError };
