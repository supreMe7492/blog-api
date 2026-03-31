const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const dashboard = require('./routes/dashboard')
app.use('/',dashboard)

const signUp = require('./routes/signuser');
app.use('/signup',signUp);

const logIn = require('./routes/loguser');
app.use('/login',logIn);

const author = require('./routes/author');
app.use('/author',author);

app.use((err,req,res,next)=>{
    const status = err.status || 500;
    res.status(status).json({
        success: false,
        error:{
            code : status,
            message: err.message
        }
    }) 
})
app.listen(3000,()=>{
    console.log('fuck');
})