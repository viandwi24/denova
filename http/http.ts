import { Application as OakApplication, Router as OakRouter } from "../deps.ts";

let Http: any = null;
let Router = new OakRouter;

export { Http, Router };
export function makeHttp() {
    let app = new OakApplication;
    
    // Logger
    app.use(async (ctx, next) => {
        await next();
        const rt = ctx.response.headers.get("X-Response-Time");
        console.log(`[${ctx.request.method}][${rt}] ${ctx.request.url}`);
    });
    
    // Timing
    app.use(async (ctx, next) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        ctx.response.headers.set("X-Response-Time", `${ms}ms`);
    });

    // return
    Http = app;
    return app;
}