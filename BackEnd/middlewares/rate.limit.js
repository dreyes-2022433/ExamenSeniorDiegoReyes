import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
    windowMs: 5 *1000, 
    max: 5,
     message: {
            message: "You're blocked, wait 15 minutes"
        }
});