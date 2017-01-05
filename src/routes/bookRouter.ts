import {Router, Request, Response, NextFunction} from 'express';
import {Server, Path, GET, POST, DELETE, PUT, PathParam, QueryParam, Errors, Return, ServiceContext} from "typescript-rest";

import BooksController from '../controller/bookController';

import {PaginationParams} from '../models/paginationParams';

import {UnprocessableEntityError} from '../errors/http/unprocessableEntity';


@Path("/api/v1/books")
export default class BookRouter {

  @GET
  public getAll(@QueryParam('limit') lim: number, @QueryParam('offset') offs: number) {
    var parms = new PaginationParams(offs, lim);
    return new BooksController().getAllBooks(parms)
    .then(function(rows) {
        return rows;
    });
  }

  @Path(":id")
  @GET
  public getSingle(@PathParam('id') id: number) {
    return new BooksController().getSingleBook(id)
    .then(function(row) {
      if (!row) {
        throw new Errors.NotFoundError();
      }
      return row;
    });
  }

  @POST
  public create(book: any) {
    return new BooksController().createBook(book)
    .then(function(genId) {
      return new Return.NewResource('/api/v1/books/' + genId);
    })
    .catch(function (err) {
      throw new Errors.ConflictError('An entry with the specified name already exists');
    });
  }

  @Path(":id")
  @DELETE
  public remove(@PathParam('id') id: number) {
    return new BooksController().removeBook(id);
  }

  @Path(":id")
  @PUT
  public change(@PathParam('id') id: number, data: any) {
    if (data && data.id) {
      throw new UnprocessableEntityError();
    }
    return new BooksController().changeBook(id, data);
  }

}
