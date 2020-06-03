import { require } from "../support/require.ts";

export interface IGroup {
    prefix?: string;
    middleware?: Array<string>;
}

export interface IRoute {
    method: string;
    uri: string;
    middleware: Array<string>,
    action: string|void|any;
}

export class Router {
    /**
     * Route map
     */
    private routes: Array<IRoute> = [];
    
    /**
     * Group cache
     */
    private groups: any = {};

    /**
     * add Get Route
     * 
     * @string uri
     * @param action 
     */
    public get(uri:string, action:string|any) {
        this.pushRoute("get", uri, action);
        return this;
    }

    /**
     * add Post Route
     * 
     * @string uri
     * @param action 
     */
    public post(uri:string, action:string|any) {
        this.pushRoute("post", uri, action);
        return this;
    }

    /**
     * add Put Route
     * 
     * @string uri
     * @param action 
     */
    public put(uri:string, action:string|any) {
        this.pushRoute("put", uri, action);
        return this;
    }

    /**
     * add Delete Route
     * 
     * @string uri
     * @param action 
     */
    public delete(uri:string, action:string|any) {
        this.pushRoute("delete", uri, action);
        return this;
    }

    /**
     * add Patch Route
     * 
     * @string uri
     * @param action 
     */
    public patch(uri:string, action:string|any) {
        this.pushRoute("patch", uri, action);
        return this;
    }

    /**
     * add Options Route
     * 
     * @string uri
     * @param action 
     */
    public options(uri:string, action:string|any) {
        this.pushRoute("options", uri, action);
        return this;
    }

    /**
     * push route to routemap
     * 
     * @param method 
     * @param uri 
     * @param action 
     */
    private pushRoute(method: string, uri: string, action: string|void) {
        let middleware = [];

        // build with group
        if (typeof this.groups.prefix != 'undefined') uri = this.groups.prefix + uri;
        if (typeof this.groups.middleware != 'undefined') middleware = this.groups.middleware;
        uri = this.safeUri(uri);

        // push to route map
        let route: IRoute = { method, uri, action, middleware };
        this.routes.push(route);
    }


    /**
     * parse safe uri
     * 
     * @param uri 
     */
    private safeUri(uri: string) {
        let segment = uri.split("/");
        for (let index in segment) {
            if (segment[index] == '') segment.splice(parseInt(index), 1);
        }

        return "/" + segment.join("/");
    }

    /**
     * Grouping a route
     * 
     * @param option 
     * @param group - string:file|any:closure
     */
    public async group(option: IGroup, group: string|any) {
        let lastGroups = {...this.groups};

        // build a group
        this.buildGroup(option);

        // run grouping
        if (typeof group == 'string') {
            await require(group);
        } else {
            group();
        }

        // return a groups
        this.groups = {...lastGroups};
    }

    /**
     * build a groupping
     * 
     * @param option 
     */
    private buildGroup(option: IGroup) {
        // prefix
        if (typeof option.prefix != 'undefined') {
            if (typeof this.groups['prefix'] != 'undefined') {
                this.groups['prefix'] = this.groups['prefix']
                    + option.prefix;
            } else {
                this.groups['prefix'] = option.prefix;
            }
        }
        // middleware
        if (typeof option.middleware != 'undefined') {
            let middlewares = option.middleware;
            if (typeof this.groups['middleware'] == 'undefined') {
                this.groups['middleware'] = [];
            }
            
            // add middleware to group
            for(let index in middlewares) {
                let md = middlewares[index];
                let search = this.groups.middleware.find((e: any) => e === md);
                if (typeof search == 'undefined') {
                    this.groups.middleware = [...this.groups.middleware];
                    this.groups.middleware.push(md);
                }
            }
        }
    }



    /**
     * Print to console a route list
     */
    public print() {
        // scan gap
        let closure = "Closure";
        let gapMethod = Math.max.apply(Math, this.routes.map((value: any) => value.method.length) );
        let gapUri = Math.max.apply(Math, this.routes.map((value: any) => value.uri.length) );
        let gapMiddleware = Math.max.apply(Math, this.routes.map((value: any) => value.middleware.join(',').length) );
        let gapAction = Math.max.apply(Math, this.routes.map((value: any) => {
            if (this.isFunction(value.action)) return closure.length;
            return value.action.length;
        }) );

        // heading
        let heading = {
            method: '[Method]',
            uri: '[Uri]',
            action: '[Action]',
            middleware: '[Middleware]'
        };
        gapMethod = Math.max(gapMethod, heading.method.length);
        gapUri = Math.max(gapUri, heading.uri.length);
        gapAction = Math.max(gapAction, heading.action.length);
        gapMiddleware = Math.max(gapMiddleware, heading.middleware.length);
        console.log(this.buildGap('', gapMethod+gapUri+gapAction+gapMiddleware, '-'));
        console.log(
            `${heading.method} ${this.buildGap(heading.method, gapMethod)}` +
            `| ${heading.uri} ${this.buildGap(heading.uri, gapUri)}` +
            `| ${heading.action} ${this.buildGap(heading.action, gapAction)}` +
            `| ${heading.middleware} ${this.buildGap(heading.middleware, gapMiddleware)}`
        )
        console.log(this.buildGap('', gapMethod+gapUri+gapAction+gapMiddleware, '-'));

        // route list
        for(let index in this.routes) {
            let route = this.routes[index];
            let middleware = route.middleware.join(",");
            let action = (this.isFunction(route.action)) ? 'Closure' : route.action;
            console.log(
                `${route.method.toUpperCase()} ${this.buildGap(route.method, gapMethod)}` +
                `| ${route.uri} ${this.buildGap(route.uri, gapUri)}` +
                `| ${action} ${this.buildGap(action, gapAction)}` +
                `| ${middleware} ${this.buildGap(middleware, gapMiddleware)}`
            );
        }
        console.log(this.buildGap('', gapMethod+gapUri+gapAction+gapMiddleware, '-'));
    }

    /**
     * Build gap for string
     * 
     * @param string 
     * @param max 
     * @param elGap 
     */
    private buildGap(string: string, max: number, elGap: string = ' ') {
        let gap = max - string.length;
        let res = '';
        for(let i = 0; i < gap; i++) {
            if(elGap == '-' && i%7 == 0) res+= '-';
            res += elGap
        }
        return res;
    }

    /**
     * check a value is a function
     * 
     * @param value 
     */
    private isFunction(value: any) {
        return (typeof value == 'function');
    }

    /**
     * get a collection routes
     */
    public getCollection() {
        return this.routes;
    }
}