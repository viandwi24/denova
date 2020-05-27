# Denova
A Typescript Framework For Deno - Framework Looks Like Laravel

| A Documentation and Readme will be updated gradually, please wait ^_^


## Simple use
### Create your main "app.ts"
```
import { Application, HTTPKernel } from "denova/path/mod.ts";

// create container
const app = new Application();

// bind a service and variable
app.singleton('denova.path', Deno.cwd());
app.singleton('http.kernel', new HTTPKernel);

// define routes
RouteMap.load(Deno.cwd() + "/routes/web.ts");

// http server
const request = app.make('http.kernel');
request.capture();
```


### Create route file `/routes/web.ts`
```
import { Router } from "../denova-path/facades.ts";

Router.get("/", () => {
    return "Hello World!";
});
```

### You cant run your HTTP Server with :
```
deno run -A --unstable app.ts --port=3000
```