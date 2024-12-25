import { body } from 'express-validator';

export const registerValidator = [
    body('email')
        .isEmail()
        .withMessage('Geçerli bir email adresi giriniz'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Şifre en az 6 karakter olmalıdır'),
    body('name')
        .notEmpty()
        .withMessage('İsim alanı zorunludur')
];

export const loginValidator = [
    body('email')
        .isEmail()
        .withMessage('Geçerli bir email adresi giriniz'),
    body('password')
        .notEmpty()
        .withMessage('Şifre alanı zorunludur')
]; 