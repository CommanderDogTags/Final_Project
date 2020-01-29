import { RequestHandler, Request } from 'express';
import * as passport from 'passport';

export const tokenMiddleware: RequestHandler = (req: ReqUser, res, next) => {
    return passport.authenticate('bearer', (err, user) => {
        if(user) req.user = user;
        return next();
    })(req, res, next);
};

export const isGuest: RequestHandler = (req: ReqUser, res, next) => {
    if (req.user.role === 'guest') {
        return next();
    } else {
        res.sendStatus(401);
    }
}

export const isOwner: RequestHandler = (req: ReqUser, res, next) => {
    if (req.user.user_id === Number(req.params.user_id)) {
        return next();
    } else {
        res.sendStatus(401);
    }
}

export interface ReqUser extends Request {
    user: {
        user_id: number;
        role: string;
    }
}