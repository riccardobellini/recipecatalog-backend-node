import {Router, Request, Response, NextFunction} from 'express';
import {Server, Path, GET, PathParam, QueryParam} from "typescript-rest";

import DishTypeController from '../controller/dishTypeController';

import {PaginationParams} from '../models/paginationParams';


@Path("/api/v1/dishTypes")
export default class DishTypeRouter {

  /**
   * GET all Languages.
   */
  @GET
  public getAll(@QueryParam('limit') lim: number, @QueryParam('offset') offs: number) {
    var parms = new PaginationParams(offs, lim);
    return new DishTypeController().getAllDishTypes(parms)
    .then(function(rows) {
        return rows;
    });
  }

}
