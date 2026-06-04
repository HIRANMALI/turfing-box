import winston from 'winston';

const { combine, timestamp, json, printf, colorize, align } = winston.format;

// Custom format for local development (colorized and readable)
const localFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
});

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
        timestamp({
            format: 'DD-MM-YYYY hh:mm:ss.SSS A',
        }),
        json() // Default to JSON for production
    ),
    transports: [
        new winston.transports.Console({
            // Use colorized text format for development, JSON for production
            format: process.env.NODE_ENV === 'production'
                ? combine(timestamp(), json())
                : combine(colorize(), timestamp({ format: 'DD-MM-YYYY hh:mm:ss.SSS A' }), align(), localFormat),
        }),
        // Add file transports if needed (e.g. for errors)
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

export default logger;
