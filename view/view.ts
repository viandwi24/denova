import { Dejs } from "../deps.ts";

export class View {
    constructor() {
    }

    /**
     * Return rendered file from ejs
     * 
     * @param path 
     * @param params 
     */
    public async make(path: string, params: Dejs.Params = []) {
        return await Dejs.renderFileToString( this.parsePath(path), params );
    }

    /**
     * parse path for view file render
     * 
     * @param path 
     */
    public parsePath(path: string) {
        let safe = this.safePath( path.replace(".", "/") );
        return this.getViewLocation() + safe + ".ejs";
    }

    private getViewLocation() {
        let root = Deno.cwd();
        let path = root + "/resources/views/";
        return path;
    }

    private safePath(uri: string) {
        let segment = uri.split("/");
        for (let index in segment) {
            if (segment[index] == '') segment.splice(parseInt(index), 1);
        }

        return "/" + segment.join("/");
    }
}