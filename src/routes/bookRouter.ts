import {Router} from 'express';

import BooksController from '../controller/bookController';

import {PaginationParams} from '../models/paginationParams';


export var bookRouter : Router = Router();

bookRouter.route('/')
.get((req, res) => {
  var parms = new PaginationParams(+req.query.offset, +req.query.limit);
  new BooksController().getAllBooks(parms)
  .then(function(rows) {
      res.json(rows);
  });
})
.post((req, res) => {
  new BooksController().createBook(req.body)
  .then(function(genId) {
    res.status(201).location('/api/v1/books/' + genId).send();
  })
  .catch((err) => {
    res.status(409).send(`An entry with title '${req.body.title}' already exists`);
  })
})
.delete((req, res) => {
  if (!req.query.id || req.query.id.length === 0) {
    res.sendStatus(400);
    return;
  }
  var idArr = req.query.id.split(',');
  if (idArr.length === 0) {
    res.sendStatus(400);
    return;
  }
  new BooksController().removeBooks(idArr)
  .then(() => res.sendStatus(204));
});

bookRouter.route('/:id')
.get((req, res) => {
  new BooksController().getSingleBook(+req.params.id)
  .then(function(row) {
    if (!row) {
      res.sendStatus(404);
    } else {
      res.json(row);
    }
  });
})
.put((req, res) => {
  if (req.body.id) {
    res.sendStatus(422);
  } else {
    new BooksController().changeBook(req.params.id, req.body)
    .then(() => res.sendStatus(204));
  }
})
.delete((req, res) => {
  new BooksController().removeBook(req.params.id)
  .then(() => res.sendStatus(204));
});
