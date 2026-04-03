
import { createLogger, format, transports } from 'winston';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const logger = createLogger({
    format: format.combine(
        format.simple(),
        format.timestamp(),
        format.printf(infor=> `${infor.timestamp} ${infor.level}: ${infor.message}`),
    ),
    transports: [
        new transports.File({
            maxsize: 5120000,
            maxFiles: 5,
            filename: join(__dirname, '../src/logs/app.log')
        }),
        new transports.Console({
            level: 'debug'
        })   
    ]
})