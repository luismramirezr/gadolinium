import winston from 'winston';
import os from 'os';
import 'winston-syslog';
import expressWinston from 'express-winston';

import { APP_NAME, PAPERTRAIL_HOST, PAPERTRAIL_PORT } from 'config/constants';

const localhost = os.hostname();

const options = {
  host: PAPERTRAIL_HOST,
  port: PAPERTRAIL_PORT,
  app_name: APP_NAME,
  localhost,
};

const logger = winston.createLogger();
// @ts-ignore
logger.add(new winston.transports.Syslog(options));

expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');

export default expressWinston.logger({
  transports: [logger],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  msg:
    'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
  expressFormat: true,
  colorize: true,
});
