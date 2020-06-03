import { Service, Request } from "../../../mod.ts";

@Service()
export class TesMiddleware {

    // handle
    public async handle(request: Request, next: any) {
        console.log("Tes Middleware handler");
        return await next();
    }
}