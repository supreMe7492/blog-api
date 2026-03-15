const {prisma} = require('../lib/prisma');
async function main() {
  const user = await prisma.user.create({
    data: {
      name: "admin",
      password: "hashedpassword123",
      posts: {
        create: [
          {
            title: "My First Blog Post",
            content: "This is my first post in the blog.",
            published: true,
            comments: {
              create: [
                {
                  name: "John",
                  comment: "Nice article!"
                },
                {
                  name: "Alice",
                  comment: "Looking forward to more posts."
                }
              ]
            }
          },
          {
            title: "Second Blog Post",
            content: "Another day, another post.",
            published: true,
            comments: {
              create: [
                {
                  name: "Bob",
                  comment: "Good explanation!"
                }
              ]
            }
          }
        ]
      }
    },
    include: {
      posts: {
        include: {
          comments: true
        }
      }
    }
  });

  console.log(user);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });