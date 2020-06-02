import { Dejs } from "../deps.ts";
import { Exception } from "../exception/exception.ts";

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
        try {
            return await Dejs.renderFileToString( this.parsePath(path), params );
        } catch (err) {
            path = this.parsePath(path);
            throw new Exception("Failed open view file", err, { path })
        }
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

    /**
     * get views location
     */
    private getViewLocation() {
        let root = Deno.cwd();
        let path = root + "/resources/views/";
        return path;
    }

    /**
     * parse a safe uri
     * 
     * @param uri 
     */
    private safePath(uri: string) {
        let segment = uri.split("/");
        for (let index in segment) {
            if (segment[index] == '') segment.splice(parseInt(index), 1);
        }

        return "/" + segment.join("/");
    }

    /**
     * check file exist
     * 
     * @param filename 
     */
    private async exists (filename: string): Promise<boolean> {
        try{
          await Deno.stat(filename);
          return true;
        } catch (error) {
            return false;
        }
    };
}