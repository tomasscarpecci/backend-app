import { Router } from 'express';
import EditorialController from './EditorialController';


export default (editorialController: EditorialController) => {
  const router = Router();

  router.get('/', editorialController.getAll);
  router.get('/:id', editorialController.getById);
  router.post('/', editorialController.create);
  router.put('/:id', editorialController.update);
  router.delete('/:id', editorialController.delete);

  return router;
};





/*import { Router } from 'express';
import EditorialController from './EditorialController.js';

const router = Router();

const editorialController = new EditorialController();

router.get('/', editorialController.getAll);
router.get('/:id', editorialController.getById);
router.post('/',editorialController.create);
router.put('/:id', editorialController.update);
router.delete('/:id', editorialController.delete);

export default router;*/