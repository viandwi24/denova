import { Config as FConfig } from "../support/config.ts";
import { getFacade } from "../support/facades.ts";

let Config = getFacade('Config', new FConfig);

export { Config };