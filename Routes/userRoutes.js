const express = require('express');
const { loginController, signUpController, fetchAllUserControllers } = require('../Controllers/userControllers');

const Router = express.Router();

Router.post('/Login', loginController);
Router.post('/SignUp', signUpController);
Router.get('/fetchUsers', protect, fetchAllUserControllers);

module.exports = Router;