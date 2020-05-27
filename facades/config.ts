import { Config as FConfig } from "../support/config.ts";
import * as Facades from "../support/facades.ts";

let Config = Facades.getFacade('Config', new FConfig);

export { Config };