import userService from '../services/userService.js';

class UserController {
    async getProfile(req, res) {
        try {
            const user = await userService.getUserProfile(req.user.id);
            res.json(user);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async updateProfile(req, res) {
        try {
            const user = await userService.updateUserProfile(req.user.id, req.body);
            res.json({
                message: 'Profil güncellendi',
                user
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default new UserController(); 