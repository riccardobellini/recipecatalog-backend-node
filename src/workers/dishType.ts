import * as dishTypeDb from '../modules/database/dishType';
import {DishType} from '../models/dishType';


import * as Knex from 'knex';

export default class DishTypeWorker {
    readDishTypes(): Promise<Array<DishType>> {
        return dishTypeDb.readDishTypes();
    }
}