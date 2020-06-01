import { Router, view } from "../mod.ts";

Router.get('/', async () => {
    return await view('welcome', {name:'world'});
});