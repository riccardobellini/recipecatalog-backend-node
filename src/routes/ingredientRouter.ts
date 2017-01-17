import {Router} from 'express';

import IngredientController from '../controller/ingredientController';

import {PaginationParams} from '../models/paginationParams';


export var ingredientRouter : Router = Router();

ingredientRouter.route('/')
.get((req, res) => {
  var parms = new PaginationParams(+req.query.offset, +req.query.limit);
  new IngredientController().getAllIngredients(parms)
  .then(function(rows) {
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
