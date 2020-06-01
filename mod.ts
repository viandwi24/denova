// Copyright 2020 the Denova authors. All rights reserved. MIT license.

// Foundation
export { Application } from "./foundation/application.ts";
export { Services } from "./foundation/services.ts";
export { version } from "./version.ts";

// Http
export { Kernel as HTTPKernel } from "./http/kernel.ts";
export { Request } from "./http/request.ts";
export { Response } from "./http/response.ts";
export { RouteCollection } from "./http/route_collection.ts";

// Console
export { Kernel as ConsoleKernel } from "./console/kernel.ts";


// Support / Library
export { env } from "./support/env.ts";
export { Router } from "./facades/router.ts";
export * as Env from "./support/env.ts";
export * as Config from "./support/config.ts";
export { require } from "./support/require.ts";

// Thirdparty
export { Service, Inject } from "./service.ts";

// Interfaces
export interface ServiceProvider {
    register(): void;
    boot(): void;
}