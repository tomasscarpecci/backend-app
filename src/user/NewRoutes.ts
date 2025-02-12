import { Router } from 'express';
import NewController from './NewController';


export default (newController: NewController) => {
  const router = Router();

  router.get('/', newController.getAll);
  router.get('/:id', newController.getById);
  router.post('/', newController.create);
  router.put('/:id', newController.update);
  router.delete('/:id', newController.delete);

  return router;
};





/*import { Router } from 'express';
import NewController from './NewController.js';

const router = Router();

const newController = new NewController();

router.get('/', newController.getAll);
router.get('/:id', newController.getById);
router.post('/',newController.create);
router.put('/:id', newController.update);
router.delete('/:id', newController.delete);

export default router;*/