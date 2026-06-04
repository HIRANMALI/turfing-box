import authService from '../services/authService.js';

const authController = {
    // Register
    registerUser: (req, res) => authService.registerUser(req, res),

    // Login
    login: (req, res) => authService.loginUser(req, res),

    // Logout
    logout: (req, res) => authService.logoutUser(req, res),

    // Refresh Token
    refresh: (req, res) => authService.refreshUser(req, res),

    // Password Management
    forgotPassword: (req, res) => authService.forgotPassword(req, res),
    resetPassword: (req, res) => authService.resetPassword(req, res),

    verifyEmail: (req, res) => authService.verifyEmail(req, res),

    // OAuth
    google: (req, res) => authService.handleOAuthCallback(req, res),
    facebook: (req, res) => authService.handleOAuthCallback(req, res),
};

export default authController;