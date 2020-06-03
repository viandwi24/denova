import "https://cdn.pika.dev/@abraham/reflection@^0.7.0";
import {
    Application,
    HTTPKernel,
    Router,
} from "https://deno.land/x/denova@0.1.3/mod.ts";

/** create application */
const app = new Application;

/** bind service */
app.bind('denova.path', Deno.cwd());
app.bind(HTTPKernel);

/** register a route */
Router.get('/', () => 'Hello world!');

/** run a http server */
await app.make(HTTPKernel).capture();
