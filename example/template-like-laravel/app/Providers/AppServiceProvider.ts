import { ServiceProvider, Service, Application } from "../../mod.ts";

@Service()
export class AppServiceProvider implements ServiceProvider {
    constructor(private app: Application) {
        
    }

    public register() {

    }

    public boot() {

    }
}