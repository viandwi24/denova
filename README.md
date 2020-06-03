# Denova
A Typescript Framework For Deno - Framework Looks Like Laravel

| See docs in : https://viandwi24.github.io/denova

| or : https://deno.land/x/denova@0.1.3/docs/README.md

| A Documentation and Readme will be updated gradually, please wait ^_^

<hr>

## Standart Use
#### Clone a boilerplate look larave structure
```
git clone https://github.com/viandwi24/denova-project
cd denova-project
```
or you can see in `https://deno.land/x/denova@0.1.3/example` for same boilerplate

#### denova console
```
deno run -A --unstable -c tsconfig.json denova.ts version
deno run -A --unstable -c tsconfig.json denova.ts name
deno run -A --unstable -c tsconfig.json denova.ts route:list
```
#### run http server
```
deno run -A --unstable -c tsconfig.json app.ts --port=3000
```

#### Simple use
##### Create your main "app.ts"
```
import {
    Application,
    HTTPKernel
} from "https://deno.land/x/denova@0.1.3/mod.ts";

// create container
const app = new Application();
let root = this.app.make('denova.path');

// bind a service and variable
app.bind('denova.path', root);
app.bind(HTTPKernel);

// define routes
await Router.group({}, `${root}/routes/web.ts`);

// http server
const request = app.make(HTTPKernel);
request.capture();
```


##### Create route file `/routes.ts`
```
import {
    Router
} from "https://deno.land/x/denova@0.1.3/mod.ts";

Router.get("/", () => {
    return "Hello World!";
});
```

##### Create config file for decorator `tsconfig.json`
```
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

#### You cant run your HTTP Server with :
```
deno run -A --unstable -c tsconfig.json app.ts --port=3000
``