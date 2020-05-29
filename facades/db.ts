import { DB as FDB, IDBOptions } from "../database/db.ts";
import { getFacade } from "../support/facades.ts";
import { get as env } from "../support/env.ts";

let options: IDBOptions = {
    dbname: env('DB_NAME', 'denova'),
    driver: env('DB_DRIVER', 'mysql'),
    host: env('DB_HOST', 'localhost'),
    username: env('DB_USERNAME', 'viandwi24'),
    password: env('DB_PASSWORD', '63945'),
};

const FDBConn = new FDB(options);
await FDBConn.connect();
let DB = getFacade('DB', FDBConn);

export { DB };