import { Request } from "../http/request.ts";
import { require } from "../support/require.ts";
import { Exception } from "../exception/exception.ts";
import { StdFlags, Context, RouterContext } from  "../deps.ts";
import { Application } from "../mod.ts";
import { Response } from "../http/response.ts";

export async function controllerHanle(app: Application, action: string, context: RouterContext) {
    // make container for http
    let httpContainer = new Application(false);
    httpContainer.bind(Application, app);

    // define
    let rootPath = app.make('denova.path') ?? Deno.cwd() ;
    let ControllerPath = rootPath + "/app/Http/Controllers/";
    let controllerClassName = action.split("@")[0]
    let controllerMethodName = action.split("@")[1];
    let path = ControllerPath + controllerClassName + ".ts";

    // check file
    let check = await exists(path);
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
        let request = await getRequest(context);
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

export async function getRequest(context: RouterContext) {
    let req = new Request(context);
    await req.prepare();
    return req as Request;
}

export async function exists (filename: string): Promise<boolean> {
    try{
      await Deno.stat(filename);
      return true;
    } catch (error) {
        return false;
    }
};