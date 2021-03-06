// Copyright 2020 the Denova authors. All rights reserved. MIT license.

// Foundation
export { Application } from "./foundation/application.ts";
export { Middleware } from "./foundation/middleware.ts";
export { Services } from "./foundation/services.ts";
export { version } from "./version.ts";

// Http
export { Kernel as HTTPKernel } from "./http/kernel.ts";
export { Request } from "./http/request.ts";
export { Response } from "./http/response.ts";
export { RouteCollection } from "./http/route_collection.ts";
export { Router } from "./facades/router.ts";
export { response } from "./facades/response.ts";

// Console
export { Kernel as ConsoleKernel } from "./console/kernel.ts";

// Template engine
export { View, view } from "./facades/view.ts";

// Support / Library
export { env } from "./support/env.ts";
export * as Env from "./support/env.ts";
export * as Config from "./support/config.ts";
export { require } from "./support/require.ts";

// Thirdparty
export { Service, Inject } from "./service.ts";

// Services

// Interfaces
export interface ServiceProvider {
    register(): void;
    boot(): void;
}