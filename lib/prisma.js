require("dotenv/config");
const { PrismaPg } = "@prisma/adapter-pg";
const { PrismaClient } = "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };