import * as express from 'express';
import DB from '../../db';
import config from '../../config';
import { isGuest, ReqUser } from '../../middleware/auth-checkpoints';

const router = express.Router();

router.get('/:photoid', async (req, res) => {
    let photoid = req.params.photoid;
    try {
        let comments = await DB.comments.getComments(photoid);
        res.send(comments);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

router.post('/', async (req, res) => {
    let comment = req.body.comment;
    let user = req.body.user_id;
    let photo = req.body.photo_id;
    try {
        let result = await DB.comments.postComment(comment, user, photo)
        res.json(result)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

export default router;