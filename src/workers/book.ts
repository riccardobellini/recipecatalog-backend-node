import * as bookDb from '../modules/database/book';
import {Book} from '../models/book';
import {PaginationParams, Defaults} from '../models/paginationParams';

import * as Knex from 'knex';

export default class BookWorker {
    readBooks(parms ?: PaginationParams) {
        if (!parms) {
            var parms = new PaginationParams();
        }
        return bookDb.readBooks(parms);
    }

    readSingleBook(id : number) {
        return bookDb.readSingleBook(id);
    }

    createBook(dt : any) {
        return bookDb.insertBook(dt);
    }

    removeBook(id: number) {
        return bookDb.deleteBook(id);
    }

    removeBooks(ids: Array<number>) {
        return bookDb.deleteBooks(ids);
    }

    changeBook(id: number, obj: any) {
        return bookDb.updateBook(id, obj);
    }
}