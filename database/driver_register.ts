import * as Mysql from "./driver/mysql.ts";

export interface IOptions {
    driver: string;
    host: string;
    username: string;
    password: string;
    dbname: string;
}

export const driver = ['mysql'];

export async function connect(driver: string, options: IOptions): Promise<any> {
    if (driver == 'mysql') {
        let mysql_options: Mysql.IMysqlOptions = {
            db: options.dbname,
            hostname: options.host,
            username: options.username,
            password: options.password
        };
        let conn = await Mysql.connect(mysql_options);
        let driver = Mysql;
        return { conn, driver };
    }
}