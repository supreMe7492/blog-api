const {Router} = require('express');
const {signUser} = require('../controllers/userController');
const signUp = Router();
signUp.post('/',signUser);

module.exports = signUp;