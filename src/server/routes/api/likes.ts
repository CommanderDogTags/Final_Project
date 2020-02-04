import * as express from 'express';
import DB from '../../db';
import { isGuest, ReqUser } from '../../middleware/auth-checkpoints';

const router = express.Router();

router.post('/', async (req, res) => {
    let user = req.body.user_id;
    let photo = req.body.photo_id;
    try {
        let result = await DB.likes.submitLike(user, photo)
        res.json(result)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

//gets information for photos that user has liked
router.get('/', async (req:ReqUser, res) => {
    let user = req.user.user_id;
    try {
        let likes = await DB.likes.getLikedPhotos(user);
        res.send(likes);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

//checks which photos a user has liked
router.get('/check/:photoid', async (req:ReqUser, res) => {
    let user = req.user.user_id;
    let photoid = req.params.photoid
    try {
        let [likes] = await DB.likes.checkLikedPhotos(user, photoid);
        if (likes === null || likes === undefined) {
            res.json('NO');
        } else {
            res.json(likes);
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

router.delete('/', async (req, res) => {
    let user = req.body.user_id;
    let photo = req.body.photo_id;
    try {
        res.json(await DB.likes.deleteLike(user, photo))
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
})

export default router;