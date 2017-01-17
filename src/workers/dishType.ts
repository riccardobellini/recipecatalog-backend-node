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

    createDishType(dt : any) {
        return dishTypeDb.insertDishType(dt);
    }

    removeDishType(id: number) {
        return dishTypeDb.deleteDishType(id);
    }

    removeDishTypes(ids: Array<number>) {
        return dishTypeDb.deleteDishTypes(ids);
    }

    changeDishType(id: number, obj: any) {
        return dishTypeDb.updateDishType(id, obj);
    }
}