import { Router } from 'express';
import controller from './user.controller';
import { updateUser } from './user.controller';

const router = Router();

//? api/user/
router.route('/').get(controller.getMany).post(controller.createOne);

//? api/user/:id
router
  .route('/:id')
  .get(controller.getOne)
  .put(updateUser)
  .delete(controller.deleteOne);

export default router;
