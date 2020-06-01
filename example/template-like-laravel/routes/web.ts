import { Router, view, version } from "../mod.ts";

Router.get('/', async () => {
    return await view('welcome', { name: 'World', version });
});