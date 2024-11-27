import path from 'path';
import winston from 'winston';

const logFilePath = path.join(__dirname, '../logs/api.log');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: logFilePath })
    ],
});

export default logger;
