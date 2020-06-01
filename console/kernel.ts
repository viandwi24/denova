import { StdFlags, Dotenv } from "../deps.ts";
import { version } from "../version.ts";
import { Application } from "../foundation/application.ts";
import { Service } from "../service.ts";
import { env } from "../support/env.ts";
import { Router } from "../facades/router.ts";

@Service()
export class Kernel {
    parsedArgs: any;

    constructor(private app: Application) {
        this.parsedArgs = StdFlags.parse(Deno.args);
    }

    async handle() {
        let command = this.parsedArgs._[0]
        this.getCommand(command);
    }

    private getCommand(command: string) {
        switch (command) {
            case 'version':
                console.log("Denova V" + version);
                break;
            
            case 'name':
                console.log("App Name : " + env('APP_NAME', null));
                break;
            
            case 'route:list':
                Router.print();
                break;
        
            default:
                console.log("Command not found.");
                break;
        }
    }
}