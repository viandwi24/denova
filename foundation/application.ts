import * as Str from "../support/str.ts";
import { DI } from "../deps.ts";

export class Application {
    private signature: string = '';
    public container: DI.ServiceCollection;

    constructor(addMeTo: boolean = true) {
        this.signature = Str.random(100);
        this.container = new DI.ServiceCollection();
        if (!addMeTo) return this;
        this.container.addStatic(Application, this);
        return this.container.get(Application);
    }

    /**
     * bind a service to container
     * 
     * @param value 
     */
    public bind(value: any): void;

    /**
     * bind a service to container
     * 
     * @param key 
     * @param value?
     */
    public bind(key: any, value: any): void;
    public bind(key: any, value?: any) {
        if (arguments.length == 1) value = key;
        if (typeof value == 'function' && typeof value.name != 'undefined') {
            this.container.addTransient(value);
            return this.make(value);
        } else {
            this.container.addStatic(key, value);
        }
        return this.make(key);
    }

    /**
     * bind a service to container as Singleton
     * 
     * @param value 
     */
    public singleton(value: any) {
        this.container.addSingleton(value);
    }

    /**
     * resolve a service from container
     * 
     * @param key
     */
    public make(key: any): any {
        return this.container.get(key);
    }

    /**
     * get signature container
     */
    public getSignature(): string {
        return this.signature;
    }

}