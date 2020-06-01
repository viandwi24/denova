import { Config, Env } from "../mod.ts";

/**
 * export Root Path
 */
export const root = Deno.cwd();

/**
 * Bootstrap a config
 */
export async function BootstrapConfig() {
    Env.load(root + "/.env");
    await Config.loadFromFolder(root + "/config");
}