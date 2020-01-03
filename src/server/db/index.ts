import * as mysql from 'mysql';
import config from '../config';

export const pool = mysql.createPool(config.mysql);

export const Query = <T = any>(query: string, values?: any) => {
	return new Promise<T>((resolve, reject) => {
		pool.query(query, values, (err, results) => {
			if (err) reject(err);
			resolve(results);
		});
	});
};

import tokens from './queries/tokens';
import users from './queries/users';

export default {
	tokens,
	users
}