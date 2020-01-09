import { Router } from 'express';
import photosRouter from './photos';
import usersRouter from './users';
import { tokenMiddleware } from '../../middleware/auth-checkpoints';

const router = Router();

router.use(tokenMiddleware)
router.use('/photos', photosRouter);
router.use('/users', usersRouter);

export default router;