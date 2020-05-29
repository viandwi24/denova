# Denova
A Typescript Framework For Deno - Framework Looks Like Laravel<br>
See docs in : https://viandwi24.github.io/denova
| A Documentation and Readme will be updated gradually, please wait ^_^


## Standart Use
## Clone a boilerplate look larave structure
```
git clone https://github.com/viandwi24/denova-project
cd denova-project
```
## denova console
```
deno run -A denova.ts version
```
## run http server
```
deno run -A app.ts --port=3000
```

## Simple use
### Create your main "app.ts"
```
import {
    Application,
    HTTPKernel
} from "https://deno.land/x/denova@0.1.2/mod.ts";

// create container
const app = new Application();

// bind a service and variable
app.singleton('denova.path', Deno.cwd());
app.singleton('http.kernel', new HTTPKernel);

// define routes
RouteMap.load(Deno.cwd() + "/routes.ts");

// http server
const request = app.make('http.kernel');
request.capture();
```


### Create route file `/routes.ts`
```
import {
    Router
} from "https://deno.land/x/denova@0.1.2/facades.ts";

Router.get("/", () => {
    return "Hello World!";
});
```

### You cant run your HTTP Server with :
```
deno run -A --unstable app.ts --port=3000
```