import { ServiceProvider, Service, Application, Config } from "../../mod.ts";
import * as Driver from "https://deno.land/x/denova@0.1.3/database/driver.ts";
import { make, IConnectionOption } from "https://deno.land/x/denova@0.1.3/database/connection.ts";
import { Database } from "https://deno.land/x/denova@0.1.3/database/database.ts";

@Service()
export class DatabaseServiceProvider implements ServiceProvider {
    constructor(private app: Application) {
        
    }

    public async register() {
        await Driver.add('mysql', 'file:///home/viandwi24/Project/denova-0.1.3/database/driver/mysql.ts');
        await make(this.getConfig('mysql'));
    }

    public async boot() {
        let db = new Database();
        let result = await db.query("SELECT * FROM users");
    }

    private getConfig(driver: string) {
        return {
            driver: driver,
            host: Config.get("database").connections[driver].host,
            username: Config.get("database").connections[driver].username,
            password: Config.get("database").connections[driver].password,
            database: Config.get("database").connections[driver].database,
        } as IConnectionOption;
    }
}