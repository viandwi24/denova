import { Router as FRouter } from "../http/router.ts";
import * as Facades from "../support/facades.ts";

let Router = Facades.getFacade('Router', new FRouter);

export { Router };