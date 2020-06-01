import { Application } from "../mod.ts";
import { Service } from "../service.ts";
import { StdFlags, Context } from  "../deps.ts";
import { Router } from "../facades/router.ts";
import { Response } from "../http/response.ts";
import { Request } from "../http/request.ts";
import { 
    makeHttp, 
    Router as Http,
} from "./http.ts";
import { require } from "../support/require.ts";

@Service()
export class Kernel {
    constructor(private app: Application) {
    }

    /**
     * Capture a http request
     * for handle request from http
     */
    public async capture() {
        let options = this.getOptions();
        let http = makeHttp();

        // load routes
        await this.handlerRoute(Router.getCollection());

        // default from oak
        http.use(Http.routes());
        http.use(Http.allowedMethods());

        // http server listen
        try {
            await http.listen({
                port: options.port,
            });
        } catch (error) {
            console.log(error);
        }
    }

    private getOptions() {
        let args = StdFlags.parse(Deno.args);
        return {
            port: args.port ?? 3000
        };
    }

    private async handlerRoute(collection: any) {
        // push route to Oak Router 
        for (let index in collection) {
            let route = collection[index];
            let action = route.action;
            let callback = async (context:any) => {            
                let content = null;
                if (typeof action == "function") {
                    content = await action(context);
                } else if (typeof action == "string") {
                    content = await this.controllerHanle(action, context);
                } else {
                    content = action;
                }
    
                // handle with instance response
                let result = new Response(content, context);
                return result.handle(context);
            };
            if (route.method == 'get') Http.get(route.uri, callback);
            if (route.method == 'post') Http.post(route.uri, callback);
            if (route.method == 'put') Http.put(route.uri, callback);
            if (route.method == 'delete') Http.delete(route.uri, callback);
        }

        return null;
    }

    async controllerHanle(action:string, context:any) {
        // make container for http
        let httpContainer = new Application(false);
        httpContainer.bind(Application, this.app);

        // define
        let rootPath = this.app.make('denova.path');
        let ControllerPath = rootPath + "/app/Http/Controllers/";
        let controllerClassName = action.split("@")[0]
        let controllerMethodName = action.split("@")[1];
        let path = ControllerPath + controllerClassName + ".ts";

        // check file
        let check = await this.exists(path);
        if (!check) {
            let content = `Controller ${controllerClassName} Not Found, in ${path}`;
            let res = new Response(content);
            return res;
        }

        // load file
        let controllerFile = await require(path);

        // consruct acontroller
        httpContainer.bind(controllerFile[controllerClassName], controllerFile[controllerClassName]);

        // call action
        let controller = httpContainer.make(controllerFile[controllerClassName]);
        let response = await controller[controllerMethodName](this.getRequest(context));
        
        // return
        return response;
    }

    private getRequest(context: Context): Request {
        return new Request(context);
    }

    private async exists (filename: string): Promise<boolean> {
        try{
          await Deno.stat(filename);
          return true;
        } catch (error) {
            return false;
        }
    };
}