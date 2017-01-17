// dish type module (read-write operations on db)
import {db} from './dbModule';
import {Tables} from './dbConstants';
import {Ingredient} from '../../models/ingredient';

import {PaginationParams} from '../../models/paginationParams';


import * as Knex from 'knex';

// var db = new DbModule().db;


export function readIngredients(parms: PaginationParams){
    var resp = {
        pagination : {},
        results : []
    };
    return db(Tables.Ingredient.TblName).count('* as TOTAL').first()
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
        return db.select().from(Tables.Ingredient.TblName).orderBy(Tables.Ingredient.Columns.Name, 'asc').limit(parms.limit).offset(parms.offset);
    })
    .then((rows) => {
        let result : Array<Ingredient> = [];
        for (let row of rows) {
            result.push({
                id : row[Tables.Ingredient.Columns.Id],
                name : row[Tables.Ingredient.Columns.Name]
            });
        }
        resp.results = result;
        return resp;
    });
}


export function readSingleIngredient(id: number){
    return db(Tables.Ingredient.TblName).where(Tables.Ingredient.Columns.Id, id).first()
    .then((row) => {
        if (row) {
            let result : Ingredient = {
                id: row[Tables.Ingredient.Columns.Id],
                name: row[Tables.Ingredient.Columns.Name]
            };
            return result;
        }
    });
}

export function insertIngredient(ingr: any){
    if (ingr && ingr.name) {
        return db(Tables.Ingredient.TblName).where(Tables.Ingredient.Columns.Name, ingr.name).first()
        .then((row) => {
            if (row) {
                throw new Error('Dish type entry ' + ingr.name + ' already exists!');
            }
            let values = {};
            values[Tables.Ingredient.Columns.Name] = ingr.name;
            return db(Tables.Ingredient.TblName).insert(values);
        })
        .then((rowId) => {
            return rowId;
        });
    }
}

export function deleteIngredient(id: number){
    return db(Tables.Ingredient.TblName).where(Tables.Ingredient.Columns.Id, id).del()
    .then(() => {});
}

export function updateIngredient(id: number, obj: any){
    if (id && obj) {
        let updates = {};
        if (obj.name) {
            updates[Tables.Ingredient.Columns.Name] = obj.name;
        }
        return db(Tables.Ingredient.TblName).where(Tables.Ingredient.Columns.Id, id).update(updates)
        .then(() => {});
    }
}

