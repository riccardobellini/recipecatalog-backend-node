// dish type module (read-write operations on db)
import DbModule from './dbModule';
import {Tables} from './dbConstants';
import {DishType} from '../../models/dishType';

import * as Knex from 'knex';



export function readDishTypes(): Promise<Array<DishType>> {
    return new DbModule().db.select().from(Tables.DishType.TblName)
    .then(function (rows) {
        let result : Array<DishType> = [];
        for (let row of rows) {
            result.push({
                id : row[Tables.DishType.Columns.Id],
                name : row[Tables.DishType.Columns.Name]
            });
        }
        return result;
    });
}
