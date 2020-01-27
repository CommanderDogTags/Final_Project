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

//posts names and id of selected plant to database
router.post('/', async (req, res) => {
    let user_id = req.body.user_id;
    let trefle_id = req.body.trefle_id;
    let common_name = req.body.common_name;
    let scientific_name = req.body.scientific_name;
    try {
        let result = await DB.plants.postPlant(user_id, trefle_id, common_name, scientific_name)
        res.json(result)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

//gets plants for specific user based on user_id
router.get('/:user_id', async (req, res) => {
    let user_id = req.params.user_id
    try {
        let plants = await DB.plants.getPlants(user_id);
        res.send(plants);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

//gets info for individual plant based on trefle_id
router.get('/plantinfo/:id', async (req, res, next) => {
    try {
        let plants = await axios.get(`https://trefle.io/api/plants/`, {
            headers: { 'Authorization': `Bearer ${config.trefle.apiKey}` },
            params: {
                id: req.params.id
            }
        })
        res.json(plants.data)
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
})

export default router;