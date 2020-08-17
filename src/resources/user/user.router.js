import { Router } from 'express';
import controller from './user.controller';
import { updatePass, userLogin } from './user.controller';

const router = Router();

//? api/user/
router.route('/').get(controller.getMany).post(controller.createOne);

//? api/user/:id
router
  .route('/:id')
  .get(controller.getOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne);

//? api/user/login
router.route('/login').post(userLogin);
//? api/user/login/:id
router.route('/login/:id').put(updatePass);

export default router;
