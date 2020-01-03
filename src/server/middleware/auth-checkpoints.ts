import { RequestHandler, Request } from 'express';
import * as passport from 'passport';

export const tokenMiddleware: RequestHandler = (req: ReqUser, res, next) => {
    return passport.authenticate('bearer', (err, user) => {
        if(user) req.user = user;
        return next();
    })(req, res, next);
};

export const isAdmin: RequestHandler = (req: ReqUser, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next();
    } else {
        res.sendStatus(401);
    }
}

interface ReqUser extends Request {
    user: {
        role: string;
    }
}