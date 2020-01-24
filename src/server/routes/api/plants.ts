import * as express from 'express';
import config from '../../config';
import DB from '../../db';

const router = express.Router();

const axios = require('axios').default;

//returns name and id for plants from trefle
router.get('/search', async (req, res, next) => {
    try {
        let plants = await axios.get('https://trefle.io/api/plants', {
            headers: { 'Authorization': `Bearer ${config.trefle.apiKey}` },
            params: {
                q: req.query.plant
            }
        })
        res.json(plants.data)
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
})

//posts name and id of selected plant to database
router.post('/', async (req, res) => {
    let user = req.body.user_id;
    let plantid = req.body.id;
    let common_name = req.body.common_name;
    let scientific_name = req.body.scientific_name;
    try {
        let result = await DB.plants.postPlant(user, plantid, common_name, scientific_name)
        res.json(result)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

export default router;