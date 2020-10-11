//Error handlers & middlewares
const errorHandler = (err, req, res, next) => {
    const {status = 500} = err;
    res.status(status);
    res.json({
        resp: {
            success: false,
            error: [err.message] || ["Internal Server Error"],
            statusCode: status
        }
    });
};

const responseHandler = (req, res, next) => {
    console.log('res', res.locals)
    res.json({
        resp: {
            success: true,
            data: res.locals.data
        }
    })
};


module.exports = {
    errorHandler: errorHandler,
    responseHandler: responseHandler
};