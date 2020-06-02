import { Response as FResponse } from "../http/response.ts";
import { RouterContext } from "../deps.ts";

/**
 * make response
 * 
 * @param content 
 * @param status 
 * @param context 
 */
export function response(content: any, status: number = 200, context?: RouterContext) { 
    return new FResponse(content, status, context) as FResponse;
}