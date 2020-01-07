import * as express from 'express';
import * as multer from 'multer';
import * as aws from 'aws-sdk';
import * as multers3 from 'multer-s3';
import { isGuest } from '../../middleware/auth-checkpoints';

aws.config.update({
    secretAccessKey: 'wD6FoS8pqW2V26xvDz+vSVaAdms2SrIZqKNZXtEs',
    accessKeyId: 'AKIAIOAYLEE76LJR6GLQ'
});
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

router.post('/', isGuest, upload.single('image'), (req, res) => {
    //insert into database as image url
    console.log(req.file.location);
    console.log(req.body);
    res.json('Photos Test!');
})

export default router;