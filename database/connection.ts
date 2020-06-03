import * as Driver from "./driver.ts";
import { Exception } from "../exception/exception.ts";

let connections: Array<any> = [];

export interface IConnectionOption {
    driver: string;
    host: string;
    username: string;
    password: string;
    database: string;
    port?: string|number;
}

export class Connection {
    constructor(private options: IConnectionOption, public driver: Driver.Driver) {
    }

    public async connect() {
        await this.driver.connect(this.options);
    }
}

/**
 * make a connection
 * 
 * @param options 
 */
export async function make(options: IConnectionOption) {
    let driver: any = Driver.get(options.driver);
    if (driver == null) {
        throw new Exception(`Cannt find a driver for  ${options.driver}`);
    }

    let connection: Connection = new Connection(options, driver);
    await connection.connect();

    let s = connections.find((e: any) => e.name === 'default');
    let name = (typeof s == 'undefined') ? 'default' : options.driver;
    connections.push({
        name,
        options,
        connection
    });
}


/**
 * Get a connection
 * 
 * @param name 
 */
export function get(name?: string) {
    if (typeof name == 'undefined') return connections;
    let s = connections.find((e: any) => e.name === name);
    return (typeof s != 'undefined')
        ? s.connection
        : null;
}