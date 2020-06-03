import { Service, Request } from "../../../mod.ts";

@Service()
export class LoggingMiddleware {

    // handle
    public async handle(request: Request, next: any) {
        let response = await next();
        console.log("Logging middleware register first, but this execute in last");
        return response;
    }
}