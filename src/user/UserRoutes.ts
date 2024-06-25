import { Router } from 'express';
import UserController from './UserController';

const router = Router();

const userController = new UserController();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/',userController.sanitizeUserInput , userController.createUser);
router.put('/:id',userController.sanitizeUserInput , userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;