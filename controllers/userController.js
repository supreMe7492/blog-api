const {addAuthor,selectUser} = require("../db/query");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');

async function signUser(req,res) {
    const name = req.body.name;
    const password = await bcrypt.hash(req.body.password,10);
     await addAuthor(name,password);
     res.json('addedsuccessfully!')

}

async function logUser(req,res){
    const username = req.body.name;
    const password = req.body.password;
    const user = selectUser(username);
    if(!user)
        return res.json("no username");
    const match = await bcrypt.compare(password,user.password);
    if(!match)
        return res.json("incorrect password");
    const token = jwt.sign({id:user.id,name:user.name},process.env.secretkey,{ expiresIn: '7d' })
    res.json(token);   
}

module.exports = {signUser,logUser};