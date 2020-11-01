import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import serverless from 'serverless-http';
import morganBody from 'morgan-body';
import logger from 'utils/logger';
import database from 'database/index';
import models from 'collections/index';
import { tableSchema } from 'config/database';

import routes from './routes';

class App {
  public server: Express;

  constructor() {
    this.initialize();
    this.server = express();
  }

  async initialize() {
    await database(tableSchema, models);
    this.middlewares();
    this.routes();
  }

  middlewares(): void {
    this.server.use(cors());
    this.server.use(bodyParser.json());

    if (process.env.NODE_ENV === 'development') {
      morganBody(this.server, {
        maxBodyLength: 10000,
      });
    }
    this.server.use(logger);
  }

  routes(): void {
    this.server.use(routes);
  }

  // globalEHandler(): void {
  //   this.server.use(HttpExceptionHandler);
  // }
}

export const { server } = new App();

export const app = serverless(server, { binary: ['image/*', 'video/*'] });

export default app;