import * as ingredientDb from '../modules/database/ingredient';
import {Ingredient} from '../models/ingredient';
import {PaginationParams, Defaults} from '../models/paginationParams';

import * as Knex from 'knex';

export default class IngredientWorker {
    readIngredients(parms ?: PaginationParams) {
        if (!parms) {
            var parms = new PaginationParams();
        }
        return ingredientDb.readIngredients(parms);
    }

    readSingleIngredient(id : number) {
        return ingredientDb.readSingleIngredient(id);
    }

    createIngredient(ingr : any) {
        return ingredientDb.insertIngredient(ingr);
    }

    removeIngredient(id: number) {
        return ingredientDb.deleteIngredient(id);
    }

    changeIngredient(id: number, obj: any) {
        return ingredientDb.updateIngredient(id, obj);
    }
}