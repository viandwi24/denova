import { Router, view, version, Request } from "../mod.ts";

Router.get('/', async (request: Request) => {
    console.log(request);
    return await view('welcome', { name: 'World', version });
});

Router.get('/example', 'ExampleController@index');
Router.post('/example', 'ExampleController@post');
Router.get('/example/api', 'ExampleController@api');
Router.get('/example/:id', 'ExampleController@show');