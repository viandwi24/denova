/**
 * Denova - A Typescript Framework for Deno
 *
 * @package  Denova
 * @author   Alfian Dwi Nugraha <viandwicyber@gmail.com>
 */

import { Application, ConsoleKernel } from "./bootstrap/app.ts";

/*
|--------------------------------------------------------------
| Bootstrap
|--------------------------------------------------------------
|
| This bootstraps the framework and gets it ready for use, 
| then it will load up this application so that we can run it 
| and send the responses back to the browser and delight our 
| users.
|
*/
const app = Application;

/*
|--------------------------------------------------------------
| Run The Application
|--------------------------------------------------------------
|
| Once we have the application, we can handle the incoming 
| request through the kernel, and send the associated response
| back to the client's
|
*/
const console = app.make(ConsoleKernel);
console.handle();