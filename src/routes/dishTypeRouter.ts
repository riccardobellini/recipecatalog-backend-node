import {Router, Request, Response, NextFunction} from 'express';
import {Server, Path, GET, POST, PathParam, QueryParam, Errors, Return, ServiceContext} from "typescript-rest";

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

  @Path(":id")
  @GET
  public getSingle(@PathParam('id') id: number) {
    return new DishTypeController().getSingleDishType(id)
    .then(function(row) {
      if (!row) {
        throw new Errors.NotFoundError();
      }
      return row;
    });
  }

  @POST
  public create(dishType: any) {
    return new DishTypeController().createDishType(dishType)
    .then(function(genId) {
      return new Return.NewResource('/api/v1/dishTypes/' + genId);
    })
    .catch(function (err) {
      console.log(err);
      throw new Errors.ConflictError('An entry with the specified name already exists');
    });
  }

}
