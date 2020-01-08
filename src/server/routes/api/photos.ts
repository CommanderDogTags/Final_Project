import * as express from 'express';
import * as multer from 'multer';
import * as aws from 'aws-sdk';
import * as multers3 from 'multer-s3';
import config from '../../config';
import DB from '../../db';
import { isGuest } from '../../middleware/auth-checkpoints';

aws.config.update(config.aws);
const s3 = new aws.S3();

const upload = multer({ 
    storage: multers3({
        s3,
        bucket: 'plantstagram-images',
        key: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        },
        acl: 'public-read'
    })
 });

const router = express.Router();

router.post('/', upload.single('image_path'), async (req, res) => {
    //insert into database as image url
    try {
        let result = await DB.photos.postPhoto(req.file.location, req.body.caption, req.body.user_id)
        res.json(result)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
});

router.delete('/:photoid', async (req, res) => {
    let photoid = req.params.photoid
    try {
        res.json(await DB.photos.deletePhoto(photoid))
    } catch (e) {
        console.log(e)
        res.status(500).json('My code sucks.');
    }
})

router.get('/', async (req, res, next) => {
    try {
        let photos = await DB.photos.getAll();
        res.send(photos);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

export default router;