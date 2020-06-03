// Copyright 2020 the Denova authors. All rights reserved. MIT license.

import { require } from "./require.ts";
import { Exception } from "../exception/exception.ts";

/**
 * Cache a config
 * a confing loaded set in this variable.
 */
let cache: any = {};

/**
 * Load a config file from folder
 * 
 * @param path 
 */
export async function loadFromFolder(path: string){
    let dirs;

    /**
     * Get list of file in path / dir
     */
    try {
        dirs = Deno.readDirSync(path);
    } catch (err) {
        throw new Exception("Failed read a config folder.", err, {path}).log();
    }

    /**
     * Loop for get all config in file and add to cache
     */
    for (const dir of dirs) {
        let file = path + "/" + dir.name;
        let config;

        /**
         * Import a local file config
         */
        try {
            config = await require(file);
        } catch (err) {
            throw new Exception("Failed to import config file.", err, {path}).log();
        }
        cache[dir.name.replace(".ts", "")] = config.default;
    }
}


/**
 * Get a config
 * 
 * @param key 
 * @param ifNull (default)
 */
export function get(key?: string, ifNull?: any) {
    return (typeof key != 'undefined') 
        ? (cache[key] ?? ifNull)
        : cache;
}