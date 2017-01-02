import * as knex from 'knex';

import {Connection} from './dbConstants';

export default class DbModule {
	db: knex;

	constructor() {
		if (!this.db) {
			console.log("Creating database");
			this.db = knex({
				client: 'mysql',
				// debug: true,
				connection: {
					host : Connection.Host,
					user : Connection.User,
					password : Connection.Password,
					database : Connection.DbName
				}
			});
		}
	}

};