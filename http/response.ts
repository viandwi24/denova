import { Collection } from "../support/collection.ts";
import { RouterContext } from "../deps.ts";

export class Response {
    private content: any;
    private context: any;
    private status: number = 200;
    private headers: any = {};

    /**
     * make response
     * 
     * @param content 
     * @param status 
     * @param context 
     */
    constructor(content: any, status: number = 200, context?: RouterContext) {
        this.content = content;
        this.status = status;
        if (typeof context != 'undefined') this.context = context;
    }

    /**
     * add header
     * 
     * @param key 
     * @param value 
     */
    public header(key: string, value: string) {
        this.headers[key] = value;
        return this;
    }

    /**
     * add multiple header
     * 
     * @param headers 
     */
    public withHeaders(headers: Record<string,string>) {
        for (let header in headers) {
            this.headers[header] = headers[header];
        }
        return this;
    }

    /**
     * render a response to context
     * 
     * @param ctx 
     */
    async handle(ctx: any = null) {
        let content = await this.content;
        let context: RouterContext = (ctx != null) ? ctx : this.context;

        context = await this.handleContent(content, context) as RouterContext;
        context = this.handleHeader(context) as RouterContext;
        context.response.status = this.status ?? 200;

        return Object.assign({}, context);
    }

    private handleHeader(context: RouterContext): RouterContext{
        for (let header in this.headers) {
            context.response.headers.set(header, this.headers[header]);
        }
        return context;
    }

    private async handleContent(content: any, context: RouterContext) {
        if (typeof content == 'string' ) {
            context.response.body = content;
        } else if (typeof content == 'object' && content instanceof Response) {
            context = await content.handle(context);
        } else if (typeof content == 'object') {
            let res = new Collection(content);
            context.response.body = res.toJson();
            context.response.headers.set('content-type', 'application/json');
        }
        return context;
    }
}