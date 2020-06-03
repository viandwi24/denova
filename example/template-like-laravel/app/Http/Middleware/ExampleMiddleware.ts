import { Service, Request } from "../../../mod.ts";

@Service()
export class ExampleMiddleware {

    // handle
    public async handle(request: Request, next: any) {
        console.log("Example Middleware handler");
        return await next();
    }
}