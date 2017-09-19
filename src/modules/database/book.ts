// dish type module (read-write operations on db)
import {DbModule, db} from './dbModule';
import {Tables} from './dbConstants';
import {Book} from '../../models/book';

import {PaginationParams} from '../../models/paginationParams';


import * as Knex from 'knex';


export function readBooks(parms: PaginationParams){
    var resp = {
        pagination : {},
        results : []
    };
    return db(Tables.Book.TblName).count('* as TOTAL').first()
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
        return db.select().from(Tables.Book.TblName).orderBy(Tables.Book.Columns.Title, 'asc').limit(parms.limit).offset(parms.offset);
    })
    .then((rows) => {
        let result : Array<Book> = [];
        for (let row of rows) {
            result.push({
                id : row[Tables.Book.Columns.Id],
                title : row[Tables.Book.Columns.Title]
            });
        }
        resp.results = result;
        return resp;
    });
}


export function readSingleBook(id: number){
    return db(Tables.Book.TblName).where(Tables.Book.Columns.Id, id).first()
    .then((row) => {
        if (row) {
            let result : Book = {
                id: row[Tables.Book.Columns.Id],
                title: row[Tables.Book.Columns.Title]
            };
            return result;
        }
    });
}

export function insertBook(book: any){
    if (book && book.title) {
        return db(Tables.Book.TblName).where(Tables.Book.Columns.Title, book.title).first()
        .then((row) => {
            if (row) {
                throw new Error('Dish type entry ' + book.title + ' already exists!');
            }
            let values = {};
            values[Tables.Book.Columns.Title] = book.title;
            return db(Tables.Book.TblName).insert(values);
        })
        .then((rowId) => {
            return rowId;
        });
    }
}

export function deleteBook(id: number){
    return db(Tables.Book.TblName).where(Tables.Book.Columns.Id, id).del()
    .then(() => {});
}

export function deleteBooks(ids: Array<number>){
    return db(Tables.Book.TblName).whereIn(Tables.Book.Columns.Id, ids).del()
    .then(() => {});
}

export function updateBook(id: number, obj: any){
    if (id && obj) {
        let updates = {};
        if (obj.title) {
            updates[Tables.Book.Columns.Title] = obj.title;
        }
        return db(Tables.Book.TblName).where(Tables.Book.Columns.Id, id).update(updates)
        .then(() => {});
    }
}

export function searchBooks(key: string, parms: PaginationParams){
    var resp = {
        pagination : {},
        results : []
    };
    let searchClause = '%' + key + '%';
    return db(Tables.Book.TblName).count('* as TOTAL').where(Tables.Book.Columns.Title, 'like', searchClause).first()
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
            return db.select()
                .from(Tables.Book.TblName).where(Tables.Book.Columns.Title, 'like', searchClause)
                .orderBy(Tables.Book.Columns.Title, 'asc')
                .limit(parms.limit).offset(parms.offset);
        })
        .then((rows) => {
            let result : Array<Book> = [];
            for (let row of rows) {
                result.push({
                    id : row[Tables.Book.Columns.Id],
                    title : row[Tables.Book.Columns.Title]
                });
            }
            resp.results = result;
            return resp;
        });
}
