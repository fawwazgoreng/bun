import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../migrations/client";

const adapter = new PrismaMariaDb({
  host: process.env['DATABASE_HOST'],
  port: Number(process.env['DATABASE_PORT']),
  user: process.env['DATABASE_USERNAME'],
  password: process.env['DATABASE_PASSWORD'],
  database: process.env['DATABASE_NAME'],
})

const prisma = new PrismaClient({
  adapter,
  log: ['query', 'info', 'warn', 'error'],
  omit: {
    user: {
      password : true
    }
  }
});

export default prisma;