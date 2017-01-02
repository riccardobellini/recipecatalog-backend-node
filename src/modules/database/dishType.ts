// dish type module (read-write operations on db)
import DbModule from './dbModule';
import {Tables} from './dbConstants';

import * as Knex from 'knex';



export function readDishTypes(): Knex.QueryBuilder {
    return new DbModule().db.select().from(Tables.DishType.TblName);
}
