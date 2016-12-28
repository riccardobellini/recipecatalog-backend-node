import {Router, Request, Response, NextFunction} from 'express';
import FirstController from '../controller/firstController';

export class FirstRouter {
  router: Router;

  /**
   * Initialize the FirstRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all Languages.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    res.send(new FirstController().getAllLanguages());
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/', this.getAll);
  }

}

// Create the FirstRouter, and export its configured Express.Router
const firstRoutes = new FirstRouter();
firstRoutes.init();

export default firstRoutes.router;