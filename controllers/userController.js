const {addAuthor,selectUser} = require("../db/query");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');

async function signUser(req,res,next) {
    try{
        const name = req.body.name;
        const password = await bcrypt.hash(req.body.password,10);
        await addAuthor(name,password);
        res.json({success:true,message:'addedsuccessfully!'})
    }catch(err){
        next(err)
    }
}

async function logUser(req,res,next){
    try{
        const username = req.body.name;
        const password = req.body.password;
        const user = await selectUser(username);
        if(!user)
            return next({status:401,message:"not a username"})
        const match = await bcrypt.compare(password,user.password);
        if(!match)
            return next({status:401,message:"incorrect password"});
        const token = jwt.sign({id:user.id},process.env.secretkey,{ expiresIn: '7d' })
        res.json({
            token,
            authorId: user.id
        });
    }catch(err){
        next(err)
    }
}

function verifyUser(req,res,next){
    try{
        const bearerToken = req.headers.authorization;
        if(bearerToken){
         const token = bearerToken.split(" ")[1];
         const decoded = jwt.verify(token,process.env.secretkey);
         if(!decoded.id)
            return next({status:401,message:'user is not logged in'});
         req.token = token;
         req.userId = decoded.id;
        return next();
        }
        next({status:403,message:"forbidden token"});
    }catch(err){
        next({status:401,message:'invalid token'})
    }
}
module.exports = {signUser,logUser,verifyUser};