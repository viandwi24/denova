import { Application } from "../foundation/application.ts";
import { Service } from "../service.ts";
import { Context, RouterContext } from "../deps.ts";

export type BodyUndefined = { type: "undefined"; value: undefined };

export class Request {
    private body: any = null;
    public all: Record<string|number,string|undefined> = {};
    public params: Record<string|number,string|undefined> = {};

    constructor(public context: RouterContext) {
        this.context = context;
    }

    /**
     * Prepare all
     */
    public async prepare() {
        this.body = await this.context.request.body();
        this.params = this.context.params;
    }

    /**
     * get a input from query url
     * 
     * @param key 
     * @param isNull 
     */
    public async get(key?: string, isNull?: any) {
        return await this.context.request.body();
    }
}