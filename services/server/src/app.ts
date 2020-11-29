import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import serverless from 'serverless-http';
import morganBody from 'morgan-body';
import logger from 'utils/logger';
import HttpExceptionHandler from 'middlewares/HttpExceptionHandler';
import { DynamoDB, TableSchema } from 'database/Client';
import { COOKIE_SECRET, TABLE_NAME } from 'config/constants';

import routes from './routes';

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
    this.server.use(cors());
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
