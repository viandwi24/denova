import { Dotenv } from "../deps.ts";
import { Exception } from "../exception/exception.ts";

/**
 * Cache a config
 * a confing loaded set in this variable.
 */
let cache: any = {};

/**
 * Load a env file
 * 
 * @param path 
 */
export function load(path: string = '', safe: boolean = false) {
    if (path == '') path = Deno.cwd();

    let config;
    let options: Dotenv.ConfigOptions = {
        safe,
        path,
    }
    

    /**
     * Parse env
     */
    try {
        config = Dotenv.config(options);
    } catch (err) {
        throw new Exception("Failed load / parse env config", err, {path, options});
    }
    cache = {...cache, ...config};

    return cache;
}

/**
 * Get a env with key
 * 
 * @param key 
 * @param ifNull - (default)
 */
export function env(key: string, ifNull: any) {
    let result = cache[key];
    return (typeof result == 'undefined')
        ? ifNull
        : result;
}