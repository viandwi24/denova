import { Application, Service, Request } from "../../../mod.ts";

@Service()
export class ApiController {
    types = { data: Symbol("data") };

    //  constructor
    constructor(private app: Application) {
    }

    // index
    async index() {
        return "hello";
    }

    // show
    async show(request: Request) {
        return request;
    }
}