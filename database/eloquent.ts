import { DB } from "../facades.ts";

export class Model {
    private db: any = null;
    protected table: string = '';
    protected primaryKey: string = 'id';

    constructor() {
        this.db = Object.assign(Object.create(Object.getPrototypeOf(DB)), DB);
    }

    public async all() {
        return await this.db.table(this.table).get();
    }

    public async find(primaryKey: string|number) {
        return await this.db.table(this.table).where(this.primaryKey, primaryKey).first();
    }
}