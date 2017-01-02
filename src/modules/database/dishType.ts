// dish type module (read-write operations on db)
import DbModule from './dbModule';
import {Tables} from './dbConstants';
import {DishType} from '../../models/dishType';

import {PaginationParams} from '../../models/paginationParams';


import * as Knex from 'knex';

var db = new DbModule().db;


export function readDishTypes(parms: PaginationParams){
    var resp = {
        pagination : {},
        results : []
    };
    return db(Tables.DishType.TblName).count('* as TOTAL').first()
    .then(function (result) {
        let tot = result['TOTAL'];
        let pages = Math.ceil(tot / parms.limit);
        let more = parms.offset + parms.limit < tot;
        resp.pagination = {
            total : tot,
            pageCount : pages,
            perPage : parms.limit,
            hasMore : more
        };
        return db.select().from(Tables.DishType.TblName).orderBy(Tables.DishType.Columns.Name, 'asc').limit(parms.limit).offset(parms.offset);
    })
    .then(function (rows) {
        let result : Array<DishType> = [];
        for (let row of rows) {
            result.push({
                id : row[Tables.DishType.Columns.Id],
                name : row[Tables.DishType.Columns.Name]
            });
        }
        resp.results = result;
        return resp;
    });
}


export function readSingleDishType(id: number){
    return db(Tables.DishType.TblName).where(Tables.DishType.Columns.Id, id).first()
    .then(function (row) {
        if (row) {
            let result : DishType = {
                id: row[Tables.DishType.Columns.Id],
                name: row[Tables.DishType.Columns.Name]
            };
            return result;
        }
    });
}

