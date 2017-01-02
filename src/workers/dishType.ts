import * as dishTypeDb from '../modules/database/dishType';

import * as Knex from 'knex';

export default class DishTypeWorker {
    readDishTypes(): Knex.QueryBuilder {
        return dishTypeDb.readDishTypes();
    }
}