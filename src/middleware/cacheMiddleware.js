import redisClient from '../config/redis.js';

const cache = (duration) => {
    return async (req, res, next) => {
        try {
            const key = `cache:${req.originalUrl}`;
            const cachedData = await redisClient.get(key);
            
            if (cachedData) {
                return res.json(JSON.parse(cachedData));
            }
            
            const originalSend = res.json;
            res.json = function(body) {
                redisClient.setEx(key, duration, JSON.stringify(body));
                return originalSend.call(this, body);
            };
            
            next();
        } catch (error) {
            console.error('Cache Error:', error);
            next();
        }
    };
};

export default cache; 