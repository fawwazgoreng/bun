import figlet from "figlet";
import { UserCase } from "./aplication/usecase/userCase";
import userController from "./interface/http/controller/userController";

const user_controller = new UserCase(new userController);

async function main () {
    const server = Bun.serve({
        port: 3000,
        routes : {
            '/' : () => new Response("hello"),
            '/user' : {
                "GET" : () => {
                    return new Response();
                } ,
                "POST" : async (req) => {
                    try {
                        const res = await user_controller.register(req);
                        if (res) {
                            return res;
                        }
                        return new Response();
                    } catch (e : any) {
                        return Response.json(e);
                    }
                },
                "DELETE" : async () => {
                    return new Response("");
                }
            }
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