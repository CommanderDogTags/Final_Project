import { Router } from 'express';
import { tokenMiddleware } from '../../middleware/auth-checkpoints';
import photosRouter from './photos';
import usersRouter from './users';
import commentsRouter from './comments';
import plantsRouter from './plants';
import likesRouter from './likes';

const router = Router();

router.use(tokenMiddleware)
router.use('/photos', photosRouter);
router.use('/users', usersRouter);
router.use('/comments', commentsRouter);
router.use('/plants', plantsRouter);
router.use('/likes', likesRouter);

export default router;