import {Router, Request, Response, NextFunction} from 'express';
import {Server, Path, GET, PathParam} from "typescript-rest";

import DishTypeController from '../controller/dishTypeController';

// import DishTypeWorker from '../workers/dishType';

@Path("/api/v1/dishTypes")
export default class DishTypeRouter {

  /**
   * GET all Languages.
   */
  @GET
  public getAll() {
    return new DishTypeController().getAllDishTypes()
    .then(function(rows) {
        return rows;
    });
  }

}
