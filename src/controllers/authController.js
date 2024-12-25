import authService from '../services/authService.js';

class AuthController {
    async register(req, res) {
        try {
            const result = await authService.register(req.body);
            res.status(201).json({
                message: 'Kullanıcı başarıyla oluşturuldu',
                user: result.user,
                token: result.token
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await authService.login(email, password);
            res.json({
                message: 'Giriş başarılı',
                user: result.user,
                token: result.token
            });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
}

export default new AuthController(); 