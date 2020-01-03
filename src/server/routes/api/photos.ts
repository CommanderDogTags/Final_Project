import * as express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
    console.log(req.body);
    res.json('Photos Test!');
})

export default router;