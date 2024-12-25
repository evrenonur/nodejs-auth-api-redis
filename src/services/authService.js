import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import { generateToken } from '../config/jwt.js';
import cacheService from './cacheService.js';

class AuthService {
    async register(userData) {
        const existingUser = await User.findOne({ where: { email: userData.email } });
        if (existingUser) {
            throw new Error('Bu email adresi zaten kullanımda');
        }

        const user = await User.create(userData);
        const token = generateToken(user);

        // Yeni kullanıcı için cache oluştur
        const cacheKey = cacheService.generateKey('user', `${user.id}:profile`);
        await cacheService.set(cacheKey, user);

        return { user, token };
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('Kullanıcı bulunamadı');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Geçersiz şifre');
        }

        const token = generateToken(user);

        // Login sonrası cache güncelle
        const cacheKey = cacheService.generateKey('user', `${user.id}:profile`);
        await cacheService.set(cacheKey, user);

        return { user, token };
    }
}

export default new AuthService(); 