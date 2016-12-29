import {Router, Request, Response, NextFunction} from 'express';
import {Server, Path, GET, PathParam} from "typescript-rest";

import FirstController from '../controller/firstController';

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
