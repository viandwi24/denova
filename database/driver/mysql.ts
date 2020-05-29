import { Mysql } from "../../deps.ts";

export interface IMysqlOptions {
    hostname: string;
    username: string;
    password: string;
    db: string;
}

export async function connect(options: IMysqlOptions) {
    return await new Mysql.Client().connect({
        hostname: options.hostname,
        username: options.username,
        db: options.db,
        password: options.password,
      });
}

export async function query(conn: any, query: string, params: Array<string|number> = []) {
    let result = await conn.execute(query, params);
    if (typeof result.rows != 'undefined') return result.rows;
    return result;
}

export async function close(conn: any) {
    return await conn.close();
}