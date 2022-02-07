const rateLimit = require("express-rate-limit")

const apiLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 5, 
    skipSuccessfulRequests: true,
    skipFailedRequests: true,
})

module.exports = { apiLimiter }


