import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import config from '../../config';
import DB from '../../db';

export const CreateToken = async (payload: IPayload) => {
    try {
        let { insertId } = await DB.tokens.insert(payload.user_id);
        payload.token_id = insertId;
        payload.unique = crypto.randomBytes(32).toString('hex');
        let token = await jwt.sign(payload, config.auth.secret);
        await DB.tokens.update(token, payload.token_id);
        return token;
    } catch (error) {
        console.log(error);
    }
}

export const ValidToken = async (token: string) => {
    let payload: IPayload = <IPayload>jwt.verify(token, config.auth.secret);
    let [accesstokenid] = await DB.tokens.findOne(payload.token_id, token);
    if (!accesstokenid) {
        throw new Error('Invalid Token!');
    } else {
        return payload;
    }
};

export interface IPayload {
    [key: string]: any;
    user_id: number;
    token_id?: number;
    unique?: string;
}