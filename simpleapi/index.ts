import figlet from "figlet";

async function main () {
    const server = Bun.serve({
        port: 3000,
        routes : {
            '/' : () => new Response("hello"),
            '/user' : () => 
        }
    })
    const data = figlet.textSync("BUN");
    console.log(data);
    console.log("listening at at http://127.0.0.1:3000");
}

main().catch((error) => {
    console.log(error);
    process.exit(1)
}) 