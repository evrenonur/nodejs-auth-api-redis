import redisClient from '../config/redis.js';

class CacheService {
    constructor(defaultTTL = 3600) { // varsayılan 1 saat
        this.defaultTTL = defaultTTL;
    }

    async get(key) {
        try {
            const data = await redisClient.get(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Cache Get Error:', error);
            return null;
        }
    }

    async set(key, value, ttl = this.defaultTTL) {
        try {
            await redisClient.setEx(key, ttl, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Cache Set Error:', error);
            return false;
        }
    }

    async del(key) {
        try {
            await redisClient.del(key);
            return true;
        } catch (error) {
            console.error('Cache Delete Error:', error);
            return false;
        }
    }

    generateKey(prefix, identifier) {
        return `${prefix}:${identifier}`;
    }
}

export default new CacheService(); 