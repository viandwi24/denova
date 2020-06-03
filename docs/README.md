# Prologue
## Denova
Denova is a framework written in typescript for Deno. 
Denova copied the style of the PHP Framework Laravel. From the Concept of Architecture, Routing, MVC, to how to interact with the database.
Denova is only a project of a student who still doesn't know anything, just study and learn.
## Features
* Service Container
* Dependencies Injection for Service
* Service Provider
* Http Server (Router, Request, Response)
* Controller for Http Server
* Database (Custom Driver, Query Builder, Deloquent ORM)
* Database Multi-Driver (now only support mysql)
* Console
* Denovamon (Hot Reload Http Server)
* View
## To Do List
* Middleware
* Finishing Query Builder & Deloquent
* Pretty Exception
* Body Parser for Request
* Console Collection

# Getting Started
## Main Module
Denova actually doesn't need a complicated installation, just take it from `https://deno.land/x/denova` repo and you just have to use it in your project!
Denova provides several main files that you can input into your project, i.e.
```
 | mod.ts
 | deps.ts
```
`mod.ts` is the main file that captures all deno library sets, so make sure to use this file and import it into your project.
`deps.ts` contains a collection of third-party libraries that work within denova.
## Boilerplate
for make users enjoy, the author has created a folder structure like in Laravel that you can use.
```
git clone https://www.github.com/viandwi24/denova-project
```
Or you can download in :
```
https://github.com/viandwi24/denova/tree/0.1.3/example/template-like-laravel
```
Then, you will get a `denova-project` folder that contains a collection of folders and files created similar to laravel.
```
.
├── app
│   ├── Http
│   │   ├── Controllers
│   │   │   ├── HomeController.ts
│   │   │   └── ApiController.ts
│   │   ├── Middleware
│   │   └── kernel.ts
│   ├── Providers
│   └── User.ts
├── bootstrap
│   ├── app.ts
│   └── config.ts
├── config
│   ├── app.ts
│   └── database.ts
├── routes
│   └── web.ts
├── .env
├── .env.example
├── app.ts
├── denova.ts
└── mod.ts
```
Run Http Server :
```
deno run -A -c tsconfig.json app.ts --port=3000
```
or with Hot Reload :
```
deno run -a denovamon.ts
```

Run Denova Console :
```
deno run -A -c tsconfig.json denova.ts name
deno run -A -c tsconfig.json denova.ts version
deno run -A -c tsconfig.json denova.ts route:list
```

# Basic Usage
## Module
To use denova, we recommend using the Boillerplate that we have provided which you can download in the "Getting Started" menu.
In Boillerplate, you can found a file `mod.ts`, in this file, include a several modules from denova that you can use.
## Routing
You can find the routing file at: `routes\web.php`
```
import { Router } from "../mod.ts";

Router.get('/', () => {
    return "Hello World!";
});
```
import `Router` from mod.ts, **Router** is a facade class that you can access statically, this module is in `denova / facades / router.ts` which is the result of the constructor from` denova / http / router.ts`.

The route you added will be stored in a collection that will be called back when `HTTPKernel` is turned on to start the request.

First, import a module :
```
import { Router } from "../mod.ts";
```
add your route by adjusting the method requirements. Route has 2 params which are `uri` and `action`.
```
Router.get('/this-is-a-uri', () => {
    return "Hello World! This is  response text";
});
```
Params `action` can use a closure / anonymous function, and must be return a `string` or instance class `Response`.

Denova use Router from "Oak" Thirdparty, and support method :
```
Router.get(uri, action);
Router.post(uri, action);
Router.put(uri, action);
Router.delete(uri, action);
```
In Boillerplate / Laravel Template, `routes\web.php` diimport oleh sebuah Service Provider yaitu di `app\Providers\RouteServiceProvider.ts` :
```
import { ServiceProvider, Service, Application, Router } from "../../mod.ts";

@Service()
export class RouteServiceProvider implements ServiceProvider {
    constructor(private app: Application) {
    }

    public register() {        
    }

    public async boot() {
        let root = this.app.make('denova.path');
        await Router.group({}, `${root}/routes/web.ts`);
    }
}
```
## Controller
Controlller path in `app\Http\Controllers\`, to connect controller from routing, see this :

First, make a new controller file, example create a file `app\Http\Controllers\ExampleController.ts` :
```
import { Application, Service } from "../../../mod.ts";

@Service()
export class ExampleController {
    types = { data: Symbol("data") };

    //  constructor
    constructor(private app: Application) {
    }

    // index
    index() {
        return "hello world using a controller.";
    }
}
```
You cannt see, a controller file must be same with controller class, `ExampleController`.
and then a controller must be have a decorator `@Service()` for Dependencies Injection on constructor your controller.

Next, edit your route to:
```
import { Router } from "../mod.ts";

Router.get('/example', 'ExampleController@index');
```
Well, it's very easy, you just need to replace the second action params with a format `YourControllerClass @ YourMethodInYourControllerClass`. 

that way, the Router will translate in the request as "when there is a request, then open the` ExampleController` controller file and run the `index` method that is inside the` ExampleController` controller class.
## View
The view is taken from the `denova \ facade \ view.ts` Facade class which is an instance of the` denova \ view \ view.ts` class. The denova template engine uses "Dejs" as our module.
```
import { Router, view } from "../mod.ts";

Router.get('/', async () => {
    return await view('welcome', { name: 'world' });
});
```
or you can use with controller :
```
import { Service, view } from "../../../mod.ts";

@Service()
export class HomeController {
    
    async index() {
        return await view('welcome', { name: 'world' });
    }
}
```
Well, the view needs 1 main params, that is, the view file, for example the view file is "welcome", the existing view file will be automatically translated as: `resources \ views \ welcome.ejs`.

Well, all you have to do is write "welcome" with no particular extension format like what you find in laravel.

Because the return of the view is a promise, so you must use the `async` function and` await`.

And this a `welcome.ejs` :
```
Hello <%= name %>
```
See completed docs in <a target="_blank" href="https://deno.land/x/dejs">Dejs Docs</a>
## Service Provider
service provider is a file that will run automatically when denova is booted. This helps you to create your own suitable script.

Service providers are registered at `config \ app.ts`, the service provider must implement the service provider interface, which must have the` register` and `boot` methods.

`config\app.ts` :
```
export default {
    services: [
        'app/Providers/RouteServiceProvider.ts',
        'app/Providers/DatabaseServiceProvider.ts',
        'app/Providers/AppServiceProvider.ts',
    ]
}
```
`app\Providers\AppServiceProvider.ts` :
```
import { ServiceProvider, Service, Application } from "../../mod.ts";

@Service()
export class AppServiceProvider implements ServiceProvider {
    constructor(private app: Application) {
        
    }

    public register() {

    }

    public boot() {

    }
}
```
## Console
Denova Console is a console that you can access by running `denova.ts`, this is available on the denova template boillerplate.

The console is still developing, for now it still doesn't support writing thirdparties, but it will be updated soon.

available command :
```
deno run -A -c tsconfig.json denova.ts name
deno run -A -c tsconfig.json denova.ts version
deno run -A -c tsconfig.json denova.ts route:list
```
## Denovamon
Denovamon is an additional helper that helps in denova development, denovamon will read the changes that occur when you save, create a file then denovamon will automatically repeat the denova http server, this way you don't need to bother restarting the denova server manually.
```
deno run -A denovamon.ts
```