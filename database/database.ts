import { Driver } from "./driver.ts";
import { Connection, get } from "./connection.ts";
import { Exception } from "../exception/exception.ts";

export class Database {
    private connection: any = null;

    constructor(connection?: Connection) {
        if (typeof connection != 'undefined') {
            this.connection = connection;
        } else {
            this.connection = get('default');
        }
    }

    public async query(query: string, params: Array<string|number> = []) {
        try {
            let result = this.connection.driver.query(query, params);
            return result;
        } catch (err) {
            throw new Exception("failed execute query.", err, { query, params });
        }
    }
}