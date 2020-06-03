import { Application } from "../mod.ts";
import { Service } from "../service.ts";
import { StdFlags, Context, RouterContext } from  "../deps.ts";
import { Router } from "../facades/router.ts";
import { IRoute } from "./router.ts";
import { Response } from "../http/response.ts";
import { controllerHanle, getRequest } from "./dispatcher.ts";
import { Middleware } from "../foundation/middleware.ts";
import { 
    makeHttp, 
    Router as HttpRouter,
} from "./http.ts";
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
        http.use((ctx) => { ctx.throw(404); });
        http.use(async (ctx) => {
            const result = await ctx.request.body({
                contentTypes: {
                    raw: ["text"],
                    text: ["application/javascript"],
                },
            });
        })

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
            let route: IRoute = collection[index];
            let action = route.action;
            let getContent = async (context: RouterContext) => {
                // content
                let content = null;
                if (typeof action == "function") {
                    content = await action(await getRequest(context));
                } else if (typeof action == "string") {
                    content = await controllerHanle(this.app, action, context);
                } else {
                    content = action;
                }
                return content;
            };
            let callback = async (context: RouterContext) => {
                let content = await getContent(context);
                let middleware;
                try {
                    let httpMiddleware = this.app.make(Middleware).getMiddlewareGroups().filter((e:any) => (route.middleware.includes(e.name)));
                    middleware = await this.app.make(Middleware).middlewareGroupsRun(httpMiddleware, await getRequest(context));
                } catch (err) {
                    let routeMiddleware = route.middleware;
                    throw new Exception("Error in middleware", err, { routeMiddleware });
                }
                
                // handle with instance response
                let response;
                if (middleware !== true) {
                    content = middleware;
                }

                if (content instanceof Response) {
                    response = content as Response;
                } else {
                    response = new Response(content, 200, context);
                }
                await response.handle(context);
            }

            if (route.method == 'get') HttpRouter.get(route.uri, callback);
            if (route.method == 'post') HttpRouter.post(route.uri, callback);
            if (route.method == 'put') HttpRouter.put(route.uri, callback);
            if (route.method == 'delete') HttpRouter.delete(route.uri, callback);
            if (route.method == 'patch') HttpRouter.patch(route.uri, callback);
            if (route.method == 'options') HttpRouter.options(route.uri, callback);
        }

        return null;
    }
}