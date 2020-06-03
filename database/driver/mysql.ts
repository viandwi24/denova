import { IConnectionOption } from "../connection.ts";
import { Mysql } from "../../deps.ts";
import { Exception } from "../../exception/exception.ts";

export const driver_name = "mysql";

export interface IMysqlOptions {
    hostname: string;
    username: string;
    password: string;
    db: string;
}

/**
 * Connect to database driver
 * 
 * @param options 
 */
export async function connect(options: IConnectionOption) {
    try {
        return await new Mysql.Client().connect({
            hostname: options.host,
            username: options.username,
            db: options.database,
            password: options.password,
        } as IMysqlOptions);
    } catch (err) {
        throw new Exception("Mysql - Cannt connect", err, {options});
    }
}

/**
 * Execute a query to database driver
 * 
 * @param conn 
 * @param query 
 * @param params 
 */
export async function query(conn: any, query: string, params: Array<string|number> = []) {
    let result = await conn.execute(query, params);
    if (typeof result.rows != 'undefined') return result.rows;
    return result;
}

/**
 * Close a connection from database driver
 * 
 * @param conn 
 */
export async function close(conn: any) {
    return await conn.close();
}