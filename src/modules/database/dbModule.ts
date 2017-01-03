import * as knex from 'knex';

import {Connection} from './dbConstants';

var env = process.env.NODE_ENV || 'development';

export default class DbModule {
	db: knex;

	constructor() {
		if (!this.db) {
			console.log("Creating database, using environment " + env);
			this.db = knex({
				client: 'mysql',
				// debug: true,
				connection: {
					host : Connection[env].Host,
					user : Connection[env].User,
					password : Connection[env].Password,
					database : Connection[env].DbName
				}
			});
		}
	}

};