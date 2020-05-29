import {
    driver as DRIVER_REGISTERED,
    connect,
    IOptions,
} from "./driver_register.ts";
import { Collection } from "../support/collection.ts";

export interface IDBOptions {
    driver: string;
    host: string;
    username: string;
    password: string;
    dbname: string;
}

export class DB {
    private options: any;
    private driver: any = null;
    private conn: any = null;
    protected builder: any = {
        table: '',
        select: [],
        type: 'select',
        where: [],
        limit: null,
    };
    

    constructor(options?: IDBOptions) {
        this.options = options;
    }

    private resetBuilder() {
        this.builder = {
            table: '',
            select: [],
            type: 'select',
            where: [],
            limit: null,
        };
    }

    public table(table_name: string) {
        this.builder.table = table_name; 
        return this;

    }
    public async connect(instance: any = null) {
        let result = null;
        if (instance != null) {
            result = instance
        } else {
            let driver = this.options.driver;
            if (!DRIVER_REGISTERED.includes(driver)) {
                throw new Error(`Driver ${driver} not registered.`);
                Deno.exit();
            }
            result = await connect(driver, this.options);
        }

        this.driver = result.driver;
        this.conn = result.conn;
        return result;
    }

    public async query(query: string, params: Array<string|number> = []) {
        try {
            let result = this.driver.query(this.conn, query, params);
            return result;
        } catch (error) {
            throw new error(error);
        }
    }

    public async close() {
        return await this.driver.close(this.conn);
    }

    

    public async first() {
        this.builder.limit = 1;
        let result = await this.get();
        return (result == null ? null : result[0]);
    }
    

    public async get() {
        this.builder.type = 'select';
        let output = this.buildQuery();
        let result = await this.query(output.query, output.params);
        console.log(output);
        return ( result.length > 0 ) ? result : null;
    }

    private buildQuery() {
        let query = '';
        let params: any = [];

        // mode
        if (this.builder.type == 'select') {
            query += 'SELECT'

            // build select
            if (this.builder.select.length == 0) query += " *"

            // from
            query += " FROM " + this.builder.table;
        }

        // build where
        if (this.builder.where.length > 0) {
            let wheres = [];
            for(let index in this.builder.where) {
                let where = this.builder.where[index];
                wheres.push(`??${where.operator}?`);
                params.push(where.collumn);
                params.push(where.value);
            }
            query += " WHERE " + wheres.join(" AND ");
        }

        // build limit
        if (this.builder.limit != null) query += " LIMIT " + this.builder.limit;


        // 
        this.resetBuilder();
        return { query, params };
    }

    public where () {
        let args = arguments;
        if (args.length == 2) {
            this.builder.where.push({ type: 'and', collumn: args[0], operator: '=', value: args[1] });
        } else {
            this.builder.where.push({ type: 'and', collumn: args[0], operator: args[1], value: args[2] });
        }
        return this;
    }
}