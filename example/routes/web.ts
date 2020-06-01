import { Router } from "../mod.ts";

Router.group({
    prefix: '/api/user',
    middleware: ['log', 'minify']
}, () => {

    Router.group({
        middleware: ['awekoaweokaweokawkoe']
    }, () => {
        Router.get('/', () => { return 'hello world!'; });
    });
    Router.get('/show', 'ApiController@show');

});