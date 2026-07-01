import winston from "winston";

const { combine, timestamp, colorize, errors, printf } = winston.format;

const consoleFormat = combine(
  colorize({ all: true }),
  timestamp({ format: "HH:mm:ss" }),
  errors({ stack: true }),
  printf(({ timestamp, level, message, stack }) => {
    return stack
      ? `${timestamp} ${level} ${stack}`
      : `${timestamp} ${level} ${message}`;
  })
);

const fileFormat = combine(
  timestamp(),
  errors({ stack: true }),
  winston.format.json()
);

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  transports: [
    new winston.transports.Console({
      format: consoleFormat,
    }),

    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      format: fileFormat,
    }),

    new winston.transports.File({
      filename: "logs/app.log",
      format: fileFormat,
    }),
  ],
});

export default logger;
