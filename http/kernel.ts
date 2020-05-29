import { 
    makeHttp, 
    Router,
} from "./http.ts";
import { StdFlags } from  "../deps.ts";
import { RouteMap } from "../mod.ts";

export class Kernel {
    routes: Array<any> = [
        { path: '/', name: 'Home' }
    ];
    
    async capture() {
        let options = this.getOptions();
        let http = makeHttp();

        // load routes
        let routes = await this.getRouteMap();

        // default from oak
        http.use(Router.routes());
        http.use(Router.allowedMethods());

        // http server listen
        try {
            console.log(`Listening on http://localhost:${options.port}`)
            await http.listen({
                port: options.port,
            });
        } catch (error) {
            console.log(error);
        }
    }

    private async getRouteMap() {
        let routes = RouteMap.get();
        for (let route in routes) {
            await import("file:///" + routes[route]);
        }
        return routes;
    }

    private getOptions() {
        let args = StdFlags.parse(Deno.args);
        return {
            port: args.port ?? 3000
        };
    }
}