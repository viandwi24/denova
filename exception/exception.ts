import { BError } from "../deps.ts";

/**
 * Denova Logger
 * for logging management
 */
export class DenovaLogger {
    public error (message: string, metadata: any) {
        console.error("[DENOVA LOGGER] " + message);
    }

    public info (message: string, metadata: any) {
        console.info("[DENOVA LOGGER] " + message);
    }
}

/**
 * Create instance of DenovaLogger
 */
export const logger = new DenovaLogger;

/**
 * Exception class
 * extend to BError
 */
export class Exception extends BError.BError {
    constructor(
        msg: string,
        cause?: Error,
        public metadata?: Record<string, unknown>
      ) {
        super("[Denova Exception] " + msg, cause, metadata);
    }

    public log(level: string = "error") {
        if (level === "error") {
            logger.error(this.message, this.metadata)
            console.log(this.message);
        } else {
            logger.info(this.message, this.metadata)
        }
    }
}