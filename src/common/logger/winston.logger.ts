// import { utilities } from "nest-winston";
// import * as winston from "winston";

// export const winstonLogger = {
//   transports: [
//     new winston.transports.Console({
//       format: winston.format.combine(
//         // winston.format.colorize({ all: true }), 
//         // winston.format.label({ label: "NestJS Logger" }),
//         winston.format.timestamp(),
//         utilities.format.nestLike("Online_Market18")
//         // winston.format.printf(({ level, message, label, timestamp }) => {
//         //   return `[${label}] ${timestamp} ${level}: ${message}`;
//         // })
//       ),
//     }),
//   ],
// };



import { utilities } from "nest-winston";
import * as winston from "winston";

export const winstonLogger = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp(),
        utilities.format.nestLike("Online_Market18")
      ),
    }),

    new winston.transports.File({
      filename: "logs/combine.log",
      level: "info",
      format: winston.format.combine(
        winston.format.label({ label: "Online_Market" }),
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),

    new winston.transports.File({
      filename: "logs/warn.log",
      level: "warn",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.label({ label: "Online_Market" }),
        winston.format.json()
      ),
    }),

    new winston.transports.File({
      filename: "logs/errors.log",
      level: "error",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.label({ label: "Online_Market" }),
        winston.format.json()
      ),
    }),
  ],
};
