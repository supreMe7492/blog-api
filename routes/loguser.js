const {Router} = require('express');
const {logUser} = require("../controllers/userController");

const logIn = Router();

logIn.post('/',logUser);

module.exports = logIn;