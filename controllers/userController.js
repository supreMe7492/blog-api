const {addAuthor} = require("../db/query");
const bcrypt = require('bcryptjs');
async function signUser(req,res) {
    const name = req.body.name;
    const password = await bcrypt.hash(req.body.password,10);
     await addAuthor(name,password);
     res.json('addedsuccessfully!')

}

module.exports = {signUser}