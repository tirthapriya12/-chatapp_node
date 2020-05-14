let Router = require('express').Router;
let routes = Router();
let userController = require('../controllers/user');
routes.post('/signup', userController.userSignUp.bind(userController));
module.exports = routes;