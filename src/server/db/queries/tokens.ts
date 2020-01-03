import { Query } from '../index';

const findOne = async (token_id: number, token: string) => Query<{}[]>(`SELECT * FROM tokens WHERE token_id =? AND token =?`, [token_id, token]);

const insert = async (user_id: number) => Query<{ insertId: number }>(`INSERT INTO tokens (user_id) VALUES (?)`, [[user_id]]);

const update = async (token: string, token_id: number) => Query(`UPDATE tokens SET token =? WHERE token_id =?`, [token, token_id]);

export default {
    findOne,
    insert,
    update
}