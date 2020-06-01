import { require } from "../support/require.ts";
import { IConnectionOption } from "./connection.ts";
import { Exception } from "../exception/exception.ts";

export interface IDriver {
    name: string|any;
    driver: string|any;
}

let driver_registered: Array<IDriver> = [];

/**
 * Register a driver service
 * 
 * @param name 
 * @param driver 
 */
export async function add(name: string, driver: string) {
    let driverModule = await require(driver);
    let driverClass = new Driver(driverModule);
    driver_registered.push({ name, driver: driverClass } as IDriver);
}

/**
 * Get a driver service
 * 
 * @param name 
 */
export function get(name?: string) {
    if (typeof name == 'undefined') return driver_registered;
    let s = driver_registered.find((e: any) => e.name === name);
    return (typeof s != 'undefined')
        ? s.driver
        : null;
}


export class Driver {
    private conn: any = null;

    constructor(private driverModule: any) {
    }

    public async connect(options: IConnectionOption) {
        this.conn = await this.driverModule.connect(options);
    }

    public async query(query: string, params: Array<string|number> = []) {
        try {
            let result = this.driverModule.query(this.conn, query, params);
            return result;
        } catch (err) {
            throw new Exception("failed execute query.", err, { query, params });
        }
    }
}