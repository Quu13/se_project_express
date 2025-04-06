const winston = require('winston');
const expressWinston = require('express-winston');

// Custom console log formatter
const customConsoleFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message, meta }) => {
    const errorStack = meta?.error?.stack || '';
    return `${timestamp} ${level}: ${errorStack || message}`;
  })
);

// Request logger
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: customConsoleFormat, // readable console logs
    }),
    new winston.transports.File({
      filename: 'request.log',
      format: winston.format.json(), // structured logs in file
    }),
  ],
});

// Error logger
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: 'error.log',
    }),
  ],
  format: winston.format.json(), // structured errors in file
});

module.exports = {
  requestLogger,
  errorLogger,
};