import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors, { CorsOptionsDelegate } from 'cors';
import cookieParser from 'cookie-parser';
import serverless from 'serverless-http';
import morganBody from 'morgan-body';
import logger from 'utils/logger';
import HttpExceptionHandler from 'middlewares/HttpExceptionHandler';
import { DynamoDB, TableSchema } from 'database/Client';
import { COOKIE_SECRET, CORS_WHITELIST, TABLE_NAME } from 'config/constants';

import routes from './routes';
import HttpError from './utils/HttpError';

class App {
  public server: Express;

  constructor() {
    this.server = express();
    this.middlewares();
    this.logger();
    this.routes();
    this.globalEHandler();
  }

  middlewares(): void {
    const whitelist = CORS_WHITELIST.split(',');

    const corsOptions: CorsOptionsDelegate = (
      req: Express.Request,
      callback: Function
    ) => {
      // @ts-ignore
      const { headers } = req;
      const { origin } = headers;
      if (!origin) return callback(null, true);
      for (let i = 0; i < whitelist.length; i += 1) {
        const test = new RegExp(whitelist[i]).test(origin);
        console.log('testing', whitelist[i], test);
        if (test) return callback(null, { origin, credentials: true });
      }
      console.log(`Origin "${origin}" is not allowed by CORS`);
      callback(
        new HttpError(`Origin "${origin}" is not allowed by CORS`, 400),
        false
      );
    };

    this.server.use(cors(corsOptions));
    this.server.use(bodyParser.json());
    this.server.use(cookieParser(COOKIE_SECRET));
  }

  logger(): void {
    if (process.env.NODE_ENV === 'production') {
      this.server.use(logger);
    } else {
      morganBody(this.server, {
        maxBodyLength: 10000,
      });
    }
  }

  routes(): void {
    this.server.use(routes);
  }

  public static async initializeDatabase(): Promise<void> {
    console.log('Initializing database...');
    try {
      const describeTable = await DynamoDB.describeTable({
        TableName: TABLE_NAME,
      }).promise();

      if (!describeTable.Table) {
        console.log('Database does not exist. Creating...');
        const createTable = await DynamoDB.createTable(TableSchema).promise();
        if (!createTable.TableDescription)
          throw new Error('Error creating Database');
        console.log('Database created');
      }
      console.log('Database initialized');
    } catch (e) {
      console.log('Database does not exist. Creating...');
      const createTable = await DynamoDB.createTable(TableSchema).promise();
      if (!createTable.TableDescription)
        throw new Error('Error creating Database');
      console.log('Database created');
    }
  }

  globalEHandler(): void {
    this.server.use(HttpExceptionHandler);
  }
}

export const { server } = new App();

App.initializeDatabase();

export const app = serverless(server, { binary: ['image/*', 'video/*'] });
