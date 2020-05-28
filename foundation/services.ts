import { app } from "../app.ts";

export class Services {
    services: any = {};
    
    async load(services: any) {
        if (typeof services == 'object') {
            let register = await this.register(services);
            let booting = await this.booting(register);
        }
    }

    async register(services: any) {
        for(let serviceKey in services) {
            let path = app().make("denova.path") + "/" + services[serviceKey] + ".ts";
            let serviceClass = await import("file:///" + path);
            let service = new serviceClass.default;

            // register services
            await service.register();

            // cache
            this.services[service.constructor.name] = service;
        }
        return this.services;
    }

    async booting(services: any) {
        for(let serviceKey in services) {
            await services[serviceKey].boot();
        }
    }
}