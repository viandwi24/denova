import { Router, view, version } from "../mod.ts";

Router.get('/', async () => {
    return await view('welcome', { name: 'World', version });
});

Router.get('/example', 'ExampleController@index');
Router.post('/example', 'ExampleController@post');
Router.get('/example/api', 'ExampleController@api');
Router.get('/example/:id', 'ExampleController@show');