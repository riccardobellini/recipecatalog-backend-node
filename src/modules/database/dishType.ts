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
    .then((result) => {
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
    .then((rows) => {
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
    .then((row) => {
        if (row) {
            let result : DishType = {
                id: row[Tables.DishType.Columns.Id],
                name: row[Tables.DishType.Columns.Name]
            };
            return result;
        }
    });
}

export function insertDishType(dt: any){
    if (dt && dt.name) {
        return db(Tables.DishType.TblName).where(Tables.DishType.Columns.Name, dt.name).first()
        .then((row) => {
            if (row) {
                throw new Error('Dish type entry ' + dt.name + ' already exists!');
            }
            let values = {};
            values[Tables.DishType.Columns.Name] = dt.name;
            return db(Tables.DishType.TblName).insert(values);
        })
        .then((rowId) => {
            return rowId;
        });
    }
}

export function deleteDishType(id: number){
    return db(Tables.DishType.TblName).where(Tables.DishType.Columns.Id, id).del()
    .then(() => {});
}

export function updateDishType(id: number, obj: any){
    if (id && obj) {
        let updates = {};
        if (obj.name) {
            updates[Tables.DishType.Columns.Name] = obj.name;
        }
        return db(Tables.DishType.TblName).where(Tables.DishType.Columns.Id, id).update(updates)
        .then(() => {});
    }
}

