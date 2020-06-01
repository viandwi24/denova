/**
 * Import a file local with async
 * 
 * @param path 
 */
export async function require(path: string) {
    let regLocal = new RegExp('file:///');
    let regOnline = new RegExp('http://|https://');
    if (!regLocal.test(path) && !regOnline.test(path)) {
        path = "file:///" + path;
    }
    return await import(path);
}