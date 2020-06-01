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
## To Do List
* Middleware
* Finishing Query Builder & Deloquent
* View
* Pretty Exception
* Exception via http
* Finishing Response, Requets for Http

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


# Style Guide
## Routing
## Controller
## View
## Database
### Query Builder
### Eloquent Model