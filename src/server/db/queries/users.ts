import { Query } from '../index';

const findAll = () => Query<{}[]>('SELECT user_id, firstname, lastname, role FROM users');

const findOneByEmail = async (email: string) => Query<{ password:string }[]>(`SELECT * FROM users WHERE email =?`, [email]);

const findOneById = async (user_id: string) => Query<{password:string}[]>(`SELECT * FROM users WHERE user_id=?`, [user_id]);

const insert = async (user: any) => Query(`INSERT INTO users SET ?`, [user]);

const getUser = async (user_id: number) => Query<[]>(`SELECT user_id, username, role, avatar_path FROM users WHERE user_id=?`, [user_id]);

const updateAvatar = async (avatar_path: string, user_id: number) => Query<{}>(`UPDATE users SET avatar_path=? WHERE user_id=?`, [avatar_path, user_id]);

export default {
    findAll,
    findOneByEmail,
    findOneById,
    insert,
    getUser,
    updateAvatar
}