const { prisma } = require("../lib/prisma")

async function selectPost(){
    return prisma.post.findMany({
        include:{
            comments : true
        }
    })
}

async function insertPost(content,title,authorId){
    return prisma.post.create({
        data:{
            title,
            content,
            authorId : parseInt(authorId)
        }
    })
}

async function addAuthor(name,password){
    return prisma.user.create({
        data:{
            name,
            password
        }
    })
}

module.exports = {selectPost,insertPost,addAuthor};