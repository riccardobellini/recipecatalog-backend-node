import {Router} from 'express';

import DishTypeController from '../controller/dishTypeController';

import {PaginationParams} from '../models/paginationParams';


export var dishTypeRouter : Router = Router();

dishTypeRouter.route('/')
.get((req, res) => {
  var parms = new PaginationParams(+req.query.offset, +req.query.limit);
  new DishTypeController().getAllDishTypes(parms)
  .then(function(rows) {
      res.json(rows);
  });
})
.post((req, res) => {
  new DishTypeController().createDishType(req.body)
  .then(function(genId) {
    res.status(201).location('/api/v1/dishTypes/' + genId).send();
  })
  .catch((err) => {
    res.status(409).send(`An entry with name '${req.body.name}' already exists`);
  })
});

dishTypeRouter.route('/:id')
.get((req, res) => {
  new DishTypeController().getSingleDishType(+req.params.id)
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
    new DishTypeController().changeDishType(req.params.id, req.body)
    .then(() => res.sendStatus(204));
  }
})
.delete((req, res) => {
  new DishTypeController().removeDishType(req.params.id)
  .then(() => res.sendStatus(204));
});
