
import { Router } from 'express';
import * as multer from 'multer';
import * as aws from 'aws-sdk';
import * as multers3 from 'multer-s3';
import config from '../../config';
import DB from '../../db';
import { isGuest, isOwner } from '../../middleware/auth-checkpoints';

const router = Router();

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

router.get('/search', isGuest, async (req, res) => {
    try {
        let photos = await DB.photos.findUsersPhotos(req.query.username);
        res.json(photos);
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
});

router.get('/', isGuest, async (req, res, next) => {
    try {
        let photos = await DB.photos.getAll();
        res.send(photos);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

router.get('/:id', isGuest, async (req, res, next) => {
    let id = req.params.photo_id;
    try {
        let blog = await DB.photos.getSinglePhoto(id);
        res.send(blog);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

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

router.delete('/:photoid', isGuest, isOwner, async (req, res) => {
    let photoid = req.params.photoid
    try {
        res.json(await DB.photos.deletePhoto(photoid))
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
})

router.put('/:photoid', isGuest, async (req, res) => {
    let photo_id = req.params.photoid;
    let caption = req.body.caption;
    try {
        return res.json(await DB.photos.editPhoto(caption, photo_id))
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
})


export default router;