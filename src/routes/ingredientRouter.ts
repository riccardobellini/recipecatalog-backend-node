import {Router} from 'express';

import IngredientController from '../controller/ingredientController';

import {PaginationParams} from '../models/paginationParams';


export var ingredientRouter : Router = Router();

ingredientRouter.route('/')
.get((req, res) => {
  let parms = new PaginationParams(+req.query.offset, +req.query.limit);
  let filter: string = req.query.q || '';
  let ctrl: IngredientController = new IngredientController();
  var promise: any;
  if (filter.length > 0) {
    // FIXME throw error if length is < 3
      promise = ctrl.searchIngredients(filter, parms);
  } else {
    promise = ctrl.getAllIngredients(parms);
  }
  promise.then(function(rows) {
      res.json(rows);
  });
})
.post((req, res) => {
  new IngredientController().createIngredient(req.body)
  .then(function(genId) {
    res.status(201).location('/api/v1/ingredients/' + genId).send();
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
  new IngredientController().removeIngredients(ids)
  .then(() => res.sendStatus(204));
});


ingredientRouter.route('/:id')
.get((req, res) => {
  new IngredientController().getSingleIngredient(+req.params.id)
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
    new IngredientController().changeIngredient(req.params.id, req.body)
    .then(() => res.sendStatus(204));
  }
})
.delete((req, res) => {
  new IngredientController().removeIngredient(req.params.id)
  .then(() => res.sendStatus(204));
});
