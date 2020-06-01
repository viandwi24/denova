import { Application } from "../foundation/application.ts";
import { Service } from "../service.ts";
import { Context } from "https://deno.land/x/oak/context.ts";

export class Request {
    constructor(public context: Context) {
        this.context = context;
    }
}