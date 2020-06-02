import { Application } from "../foundation/application.ts";
import { Request } from "../http/request.ts";
import { Service } from "../service.ts";
import { require } from "../support/require.ts";
import { Exception } from "../exception/exception.ts";

export interface IMiddlawareGroups {
    name: string;
    className: string;
    middleware: any;
}

export interface IMiddleware {
    handle(request: Request, next: void|any): void;
}

@Service()
export class  Middleware {
    private middlewareGroups: Array<IMiddlawareGroups> = [];
    private path: string = '';
    private kernel: any = null;

    constructor(private app: Application) {
        this.path = (app.make('denova.path') ?? Deno.cwd()) + "/";
    }

    public async load(path: string = this.path + "app/Http/kernel.ts") { 
        await this.loadKernel(path);
        await this.loadMiddlewareGroup();
    }

    private async loadKernel(path: string) {
        this.kernel = await require(path);
    }

    private async loadMiddlewareGroup() {
        let middlewares: Array<string|string> = this.kernel.MiddlewareGroup;
        for(let index in middlewares) {
            let name: string = index;
            let middleware = middlewares[index];
            let middlewareClass = await require(this.path + middleware);
            this.middlewareGroups?.push({
                name,
                className: this.getNameService(middleware), 
                middleware: middlewareClass
            });
        }
    }

    public async middlewareGroupsRun(middlewares: Array<IMiddlawareGroups> = [], request: Request) {
        const next = async () => {
            const app = this.app;
            let md = middlewares;
            if (md.length > 0) {
                let mdclassname = (md[0].middleware[md[0].className]) as IMiddleware;

                // bind middleware to app container for dependencies injection
                try {
                    app.bind(mdclassname);
                } catch (err) {
                }

                // resolve middleware from container
                let mdclass;
                try {
                    mdclass = app.make(mdclassname);
                } catch (err) {
                    throw new Exception("failed resolve middleware", err, {mdclassname});                    
                }
                md.splice(0, 1);
                return await mdclass.handle(request, next);
            } else {
                return true;
            }
        }
        return await next();
    }

    private getNameService(path: string): string {
        let reg = new RegExp('/([^\/]+).ts')
        let serviceNameClass: any = reg.exec(path);
        serviceNameClass = (serviceNameClass != null) ? serviceNameClass[1] : '';
        return serviceNameClass;
    }

    public getMiddlewareGroups() {
        return this.middlewareGroups;
    }
}