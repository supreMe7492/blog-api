const { prisma } = require("../lib/prisma")

async function selectAuthorPost(authorId){
    return prisma.post.findMany({
        where:{
            authorId
        },
        include:{
            comments : true
        }
    })
}

async function selectuploadedPost(){
    return prisma.post.findMany({
        include:{
            comments : true
        },
        where:{
            published : true
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

async function updatePublishPost(id){
    return prisma.post.update({
        where:{
           id: parseInt(id)
        },
        data:{
            published: true
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

async function selectUser(username){
    return prisma.user.findUnique({where:{
        name: username
    }})
}

async function updatePostContent(id,title,content,authorId){
    return prisma.post.update({
        where:{
            id: id
        },
        data:{
            title,
            content,
            authorId
        }
    })
}

module.exports = {selectAuthorPost,insertPost,addAuthor,selectUser,selectuploadedPost,updatePublishPost,updatePostContent};