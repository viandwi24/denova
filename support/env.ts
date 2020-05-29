import { Dotenv } from "../deps.ts";
import { app } from "../app.ts";

let cache: any = null;

export function get(key?: string, defaut?: string|number) {
    if (cache == null) {
        let root = (app() != null) ? app().make("denova.path") : Deno.cwd();
        let path = `${root}/.env`;
        cache = Dotenv.config({ path });
    }
    let env = cache;
    if (typeof key != 'undefined') {
        if (typeof env[key] == 'undefined') return (typeof defaut != 'undefined') ? defaut : null;
        return env[key];
    }
    return env;
}