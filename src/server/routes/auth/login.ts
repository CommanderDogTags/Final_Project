import { Router, Request } from 'express';
import * as passport from 'passport'
import { CreateToken } from '../../utils/security/token';

const router = Router();

router.post('/', passport.authenticate('local'), async (req: Req, res, next) => {
    try {
        let token = await CreateToken({ user_id: req.user.user_id });
        res.json({
            token,
            user_id: req.user.user_id,
            role: req.user.role
        })
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
})

interface Req extends Request {
    user: {
        user_id: number,
        role: string
    }
}

export default router;