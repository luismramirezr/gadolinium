import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import serverless from 'serverless-http';
import morganBody from 'morgan-body';
import logger from 'utils/logger';

import routes from './routes';

class App {
  public server: Express;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    // this.globalEHandler();
  }

  middlewares(): void {
    this.server.use(cors());
    this.server.use(bodyParser.json());

    if (process.env.NODE_ENV === 'development') {
      morganBody(this.server, {
        maxBodyLength: 10000,
      });
    }
    
    if (process.env.NODE_ENV === 'production') {
      this.server.use(logger);
    }
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
