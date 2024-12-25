import User from '../models/user.js';
import cacheService from './cacheService.js';

class UserService {
    async getUserProfile(userId) {
        const cacheKey = cacheService.generateKey('user', `${userId}:profile`);
        
        const cachedUser = await cacheService.get(cacheKey);
        if (cachedUser) {
            return cachedUser;
        }
        
        const user = await User.findByPk(userId, {
            attributes: { exclude: ['password'] }
        });
        
        if (!user) {
            throw new Error('Kullanıcı bulunamadı');
        }
        
        await cacheService.set(cacheKey, user);
        
        return user;
    }

    async updateUserProfile(userId, userData) {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('Kullanıcı bulunamadı');
        }
        
        await user.update(userData);
        
        const cacheKey = cacheService.generateKey('user', `${userId}:profile`);
        await cacheService.set(cacheKey, user);
        
        return user;
    }
}

export default new UserService(); 