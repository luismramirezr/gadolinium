import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express';

type RouteFn = (
  name: string,
  handlers: Array<RequestHandler> | RequestHandler
) => Router;

class Route {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  private wrapper(
    fn: Function
  ): (req: Request, res: Response, next: NextFunction) => void {
    const wrapperFn = (
      req: Request,
      res: Response,
      next: NextFunction
    ): void => {
      fn(req, res, next).catch(next);
    };
    return wrapperFn;
  }

  private getHanlders(
    handlers: Array<RequestHandler> | RequestHandler
  ): Array<RequestHandler> {
    if (Array.isArray(handlers)) {
      return handlers.map((hanlder) => this.wrapper(hanlder));
    }
    return [this.wrapper(handlers)];
  }

  public routes: { [key: string]: RouteFn } = {
    get: (name, handlers) =>
      this.router.get(name, ...this.getHanlders(handlers)),
    post: (name, handlers) =>
      this.router.post(name, ...this.getHanlders(handlers)),
    put: (name, handlers) =>
      this.router.put(name, ...this.getHanlders(handlers)),
    delete: (name, handlers) =>
      this.router.delete(name, ...this.getHanlders(handlers)),
  };
}

export default new Route();
