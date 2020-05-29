import { Router as Http } from "./http.ts";
import Response from "./response.ts";
import { app } from "../app.ts";

export class Router {

    get(uri:string, action:any) { this.pushRoute("get", uri, action); }
    post(uri:string, action:any) { this.pushRoute("post", uri, action); }
    put(uri:string, action:any) { this.pushRoute("put", uri, action); }
    delete(uri:string, action:any) { this.pushRoute("delete", uri, action); }

    private pushRoute(method:string, uri:string, action:any) {
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
        }

        // 
        if (method == 'get') return Http.get(uri, callback);
        if (method == 'post') return Http.post(uri, callback);
        if (method == 'put') return Http.put(uri, callback);
        if (method == 'delete') return Http.delete(uri, callback);
    }


    async controllerHanle(action:string, context:any) {
        // define
        let rootPath = app().make('denova.path');
        let ControllerPath = rootPath + "/app/Controllers/";
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
        let controllerFile = await import(path);

        // consruct acontroller
        let controller = new controllerFile[controllerClassName](context);

        // call action
        let response = controller[controllerMethodName](context.request, context.params, context);
        
        // return
        return response;
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