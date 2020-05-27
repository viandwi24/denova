let routes: Array<any> = [];

export function load(path: string) {
    routes.push(path);
}
export function get() {
    return routes;
}