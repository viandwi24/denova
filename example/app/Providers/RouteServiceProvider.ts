import { ServiceProvider, Service, Application, Router } from "../../mod.ts";

@Service()
export class RouteServiceProvider implements ServiceProvider {
    constructor(private app: Application) {
    }

    public register() {
        
    }

    // register file routes/web.ts to route collection
    public async boot() {
        let root = this.app.make('denova.path');
        await Router.group({}, `${root}/routes/web.ts`);
    }
}