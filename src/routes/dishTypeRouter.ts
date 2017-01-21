import {Router} from 'express';

import DishTypeController from '../controller/dishTypeController';

import {PaginationParams} from '../models/paginationParams';


export var dishTypeRouter : Router = Router();

dishTypeRouter.route('/')
.get((req, res) => {
  var parms = new PaginationParams(+req.query.offset, +req.query.limit);
  var filter : string = req.query.q || '';
  var ctrl : DishTypeController = new DishTypeController();
  var promise : any = {};
  if (filter.length > 0) {
    // FIXME throw error if length is < 3
    promise = ctrl.searchDishTypes(filter, parms);
  } else {
    promise = ctrl.getAllDishTypes(parms);
  }
  promise.then(function(rows) {
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
  var ids = idArr.map((el) => parseInt(el));
  new DishTypeController().removeDishTypes(ids)
  .then(() => res.sendStatus(204));
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
