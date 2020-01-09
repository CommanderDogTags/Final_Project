import * as passport from 'passport';
import * as BearerStrategy from 'passport-http-bearer';
import { ValidToken } from '../utils/security/token';
import DB from '../db';

passport.use(new BearerStrategy.Strategy(async (token, done) => {
    try {
        let payload: any = await ValidToken(token);
        // console.log(payload);
        let [user] = await DB.users.findOneById(payload.user_id);
        if(user) {
            delete user.password;
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (error) {
        console.log
        done(error);
    }
}))