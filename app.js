const express = require('express');
const app = express();
app.get('/',(req,res)=>{
    res.json('hellp world')
})
app.listen(3000,()=>{
    console.log('fuck');
})