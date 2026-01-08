import { Prisma } from "../db/prisma";

async function main() {
    const user = await Prisma.user.create({
        data : {
            name : 'test123',
            email : 'inidia@gmail.com',
            password : await Bun.password.hash("initest123")
        }
    });

    console.log(user);
}

main().catch((error) => {
    console.log(error);
}).finally(async () => {
    await Prisma.$disconnect();
});