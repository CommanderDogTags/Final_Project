import { Router } from 'express';

import photosRouter from './photos';

const router = Router();

router.use('/photos', photosRouter);

export default router;