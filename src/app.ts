import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import {Server} from "typescript-rest";


import {dishTypeRouter} from './routes/dishTypeRouter';
import {bookRouter} from './routes/bookRouter';
import {ingredientRouter} from './routes/ingredientRouter';


// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    Server.buildServices(this.express);
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();
    // placeholder route handler
    router.get('/', (req, res, next) => {
      res.json({
        message: 'Hello World!'
      });
    });
    this.express.use('/', router);

    this.express.use('/api/v1/books', bookRouter);
    this.express.use('/api/v1/ingredients', ingredientRouter);
    this.express.use('/api/v1/dishTypes', dishTypeRouter);
  }

}

export default new App().express;
