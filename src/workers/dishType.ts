import * as dishTypeDb from '../modules/database/dishType';
import {DishType} from '../models/dishType';
import {PaginationParams, Defaults} from '../models/paginationParams';

import * as Knex from 'knex';

export default class DishTypeWorker {
    readDishTypes(parms ?: PaginationParams) {
        if (!parms) {
            var parms = new PaginationParams();
        }
        return dishTypeDb.readDishTypes(parms);
    }

    readSingleDishType(id : number) {
        return dishTypeDb.readSingleDishType(id);
    }
}