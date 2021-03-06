import { Application as OakApplication, Router as OakRouter, Session } from "../deps.ts";

let Http: any = null;
let Router = new OakRouter;
let session: any = new Session({ framework: "oak" });
await session.init();

export { Http, Router };
export function makeHttp(): OakApplication {
    let app = new OakApplication;
    
    // Logger
    app.use(async (ctx, next) => {
        await next();
        const rt = ctx.response.headers.get("X-Response-Time");
        console.log(`[Denova Http] [${ctx.request.method}][${rt}] ${ctx.request.url}`);
    });
    
    // Timing
    app.use(async (ctx, next) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        ctx.response.headers.set("X-Response-Time", `${ms}ms`);
    });

    // Listenning
    app.addEventListener("listen", ({ hostname, port, secure }) => {
        console.log(
            "[Denova Http] Listening on: " +
            `${secure ? "https://" : "http://"}${hostname ?? "localhost"}:${port}`
        );
    });

    // session
    app.use(session.use()(session));

    // return
    Http = app;
    return app;
}