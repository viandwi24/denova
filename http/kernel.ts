import { Application } from "../mod.ts";
import { Service } from "../service.ts";
import { StdFlags, Context, RouterContext } from  "../deps.ts";
import { Router } from "../facades/router.ts";
import { Response } from "../http/response.ts";
import { Request } from "../http/request.ts";
import { 
    makeHttp, 
    Router as HttpRouter,
} from "./http.ts";
import { require } from "../support/require.ts";
import { Exception } from "../exception/exception.ts";

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
        http.use(HttpRouter.routes());
        http.use(HttpRouter.allowedMethods());
        http.use((ctx) => {
            ctx.throw(404);
        });

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
            let callback = async (context: RouterContext) => {
                let content = null;
                if (typeof action == "function") {
                    content = await action(context);
                } else if (typeof action == "string") {
                    content = await this.controllerHanle(action, context);
                } else {
                    content = action;
                }
    
                // handle with instance response
                let response;
                if (content instanceof Response) {
                    response = content as Response;
                } else {
                    response = new Response(content, 200, context);
                }
                await response.handle(context);
            };
            if (route.method == 'get') HttpRouter.get(route.uri, callback);
            if (route.method == 'post') HttpRouter.post(route.uri, callback);
            if (route.method == 'put') HttpRouter.put(route.uri, callback);
            if (route.method == 'delete') HttpRouter.delete(route.uri, callback);
            if (route.method == 'patch') HttpRouter.patch(route.uri, callback);
            if (route.method == 'options') HttpRouter.options(route.uri, callback);
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
        let controllerFile;
        try {
            controllerFile = await require(path);
        } catch (err) {
            let content = `Failed to import controller. (${controllerClassName}) path : ${path} | Error : ${err}`;
            let res = new Response(content);
            return res;
        }

        // contstruct and bind
        let controller;
        let response;
        try {
            // consruct acontroller
            httpContainer.bind(controllerFile[controllerClassName], controllerFile[controllerClassName]);

            // call action
            let request = await this.getRequest(context);
            controller = httpContainer.make(controllerFile[controllerClassName]);
            response = await controller[controllerMethodName](request);
        } catch (err) {
            let content = `Failed to call controller. (${controllerClassName}) path : ${path} | Error : ${err}`;
            let res = new Response(content);
            return res;
        }
        
        // return
        return response;
    }

    private async getRequest(context: RouterContext) {
        let req = new Request(context);
        await req.prepare();
        return req as Request;
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