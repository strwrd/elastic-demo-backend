import * as winston from "winston";

let logger: winston.Logger;

function initLogger(appId: string) {
  logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {service: appId},
    transports: [
      new winston.transports.Console(),
    ]
  });
}

export {initLogger, logger};