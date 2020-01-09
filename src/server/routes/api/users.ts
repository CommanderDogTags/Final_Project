import * as express from 'express';
import * as multer from 'multer';
import * as aws from 'aws-sdk';
import * as multers3 from 'multer-s3';
import config from '../../config';
import DB from '../../db';
import { isGuest, ReqUser } from '../../middleware/auth-checkpoints';

aws.config.update(config.aws);
const s3 = new aws.S3();

const upload = multer({ 
    storage: multers3({
        s3,
        bucket: 'plantstagram-avatars',
        key: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        },
        acl: 'public-read'
    })
 });

const router = express.Router();

router.put('/avatar', upload.single('avatar_path'), async (req: ReqUser, res) => {
    try {
        let avatar_path = req.file.location;
        let user_id = req.user.user_id;
        let result = await DB.users.updateAvatar(avatar_path, user_id)
        res.json(avatar_path)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
});

router.get('/', async (req: ReqUser, res, next) => {
    let user_id = req.user.user_id;
    try {
        let users = await DB.users.getUser(user_id);
        res.send(users);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

export default router;