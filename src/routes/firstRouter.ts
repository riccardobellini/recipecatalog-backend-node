import {Router, Request, Response, NextFunction} from 'express';
import {Server, Path, GET, PathParam} from "typescript-rest";

import FirstController from '../controller/firstController';

// import DishTypeWorker from '../workers/dishType';

@Path("/api/first/languages")
export default class FirstRouter {

  /**
   * GET all Languages.
   */
  @GET
  public getAll() {
    return new FirstController().getAllLanguages();
  }

}
