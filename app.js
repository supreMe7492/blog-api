const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dashboard = require('./routes/dashboard')
app.use('/',dashboard)

const signUp = require('./routes/signuser');
app.use('/signup',signUp);

const logIn = require('./routes/loguser');
app.use('/login',logIn);

app.listen(3000,()=>{
    console.log('fuck');
})