import { Query } from '../index';

const findAll = () => Query<{}[]>('SELECT user_id, firstname, lastname, role FROM users');

const findOneByEmail = async (email: string) => Query<{ password:string }[]>(`SELECT * FROM users WHERE email =?`, [email]);

const findOneById = async (user_id: string) => Query<{}[]>(`SELECT * FROM users WHERE user_id=?`, [user_id]);

const insert = async (user: any) => Query(`INSERT INTO users SET ?`, [user]);

export default {
    findAll,
    findOneByEmail,
    findOneById,
    insert
}