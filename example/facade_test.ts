import { Test as FTest } from "./test.ts";
import * as Facades from "../support/facades.ts";

let Test = Facades.getFacade('Test', FTest);

export { Test };