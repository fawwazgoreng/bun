import { sha } from "bun";
import { prisma } from "../lib/prisma";

async function main() {
    const user = await prisma.user.create({
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
    await prisma.$disconnect();
});