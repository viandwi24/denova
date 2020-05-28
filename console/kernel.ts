import { StdFlags, Dotenv } from "../deps.ts";
import { app, version } from "../app.ts";



export class Kernel {
    parsedArgs: any;

    constructor() {
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
                let root = app().make("denova.path");
                let path = `${root}/.env`;
                let config = Dotenv.config({ path });
                console.log("App Name : " + config.APP_NAME);
                break;
        
            default:
                console.log("Command not found.");
                break;
        }
    }
}
