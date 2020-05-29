# Prologue
## Denova
Denova is a framework written in typescript for Deno. 
Denova copied the style of the PHP Framework Laravel. From the Concept of Architecture, Routing, MVC, to how to interact with the database.
Denova is only a project of a student who still doesn't know anything, just study and learn.

# Getting Started
## Main Module
Denova actually doesn't need a complicated installation, just take it from `https://deno.land/x/denova` repo and you just have to use it in your project!
Denova provides several main files that you can input into your project, i.e.
```
 | mod.ts
 | facades.ts
 | app.ts
 | deps.ts
```
`mod.ts` is the main file that captures all deno library sets, so make sure to use this file and import it into your project.
`facades.ts` includes several facade classes from denova.
`app.ts` contains the bind results from your Application Container class later.
`deps.ts` contains a collection of third-party libraries that work within denova.
## Boilerplate
for make users enjoy, the author has created a folder structure like in Laravel that you can use.
```
git clone https://www.github.com/viandwi24/denova-project
```
Then, you will get a `denova-project` folder that contains a collection of folders and files created similar to laravel.
```
 |- app
   |- Controllers
     |- HomeController.ts
     |- ApiController.ts
   |- Providers
   |- User.ts
 |- bootstrap
   |- app.ts
 |- config
   |- app.ts
   |- database.ts
 |- routes
   |- web.ts
 |- .env
 |- app.ts
 |- denova.ts
 |- deps.ts
 |- mod.ts
```


# Style Guide
## Routing
## Controller
## View
## Database
### Query Builder
### Eloquent Model