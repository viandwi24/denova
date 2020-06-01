import { Application } from "./application.ts";
import { Service } from "../service.ts";
import { require } from "../support/require.ts";
import { Exception } from "../exception/exception.ts";

@Service()
export class Services {
    private services: any = [];
    private registered: any = [];
    private booted: any = [];

    constructor(private app: Application) {
    }

    public async run(services: Array<string>) {
        let root = this.app.make('denova.path') + "/";

        // list a services
        this.services = services;

        // run
        for(let index in this.services) {
            let service = this.services[index];
            let serviceName = this.getNameService(service);
            let serviceClass = await require(root + service);
            
            // bind to container
            try {
                this.app.bind(serviceClass[serviceName], serviceClass[serviceName]);
            } catch (err) {
                throw new Exception("Failed bind a service to container.", err, { service, serviceName });
            }

            let aService: any;
            
            // register service
            try {
                aService = this.app.make(serviceClass[serviceName]);
                await aService.register();
                this.registered.push({ service, name: serviceName });
            } catch (err) {
                throw new Exception("Failed register a service.", err, { service: serviceClass[serviceName] });
            }

            // boot service
            try {
                await aService.boot();
                this.booted.push({ service, name: serviceName });
            } catch (err) {
                throw new Exception("Failed booting a service.", err, { service: serviceClass[serviceName] });
            }
        }
    }

    private getNameService(path: string): string {
        let reg = new RegExp('/([^\/]+).ts')
        let serviceNameClass: any = reg.exec(path);
        serviceNameClass = (serviceNameClass != null) ? serviceNameClass[1] : '';
        return serviceNameClass;
    }
}