import { View as FView } from "../view/view.ts";
import { Dejs } from "../deps.ts";
export const View: FView = new FView();

/**
 * Return rendered file from ejs
 * 
 * @param path 
 * @param params 
 */
export async function view(path: string, params: Dejs.Params = []) { 
    return await View.make(path, params);
}