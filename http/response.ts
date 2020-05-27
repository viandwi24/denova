import { Collection } from "../support/collection.ts";

export default class Response {
    content: any;
    context: any;
    public headers: any = {};

    constructor(content: any, context: any = null) {
        this.content = content;
        this.context = context;
    }

    async handle(ctx: any = null) {
        let content = await this.content;
        let context = (this.context != null) ? this.context : ctx;  

        context = this.handleHeader(context);

        if (typeof content == 'string' ) {
            context.response.body = content;
        } else if (typeof content == 'object' && content instanceof Response) {
            context = content.handle(context);
        } else if (typeof content == 'object') {
            let res = new Collection(content);
            context.response.body = res.toJson();
        }
        
        return context;
    }

    private handleHeader(context: any){
        for (let header in this.headers) {
            context.response.headers.set(header, this.headers[header]);
        }
        return context;
    }
}