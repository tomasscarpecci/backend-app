import { Router } from 'express';
import NewscategoryController from './NewscategoryController';

export default (newCategoryController: NewscategoryController) => {
  const router = Router();

  router.get('/', newCategoryController.getAll);
  router.get('/:id', newCategoryController.getById);
  router.post('/', newCategoryController.create);
  router.put('/:id', newCategoryController.update);
  router.delete('/:id', newCategoryController.delete);

  return router;
};


/*
const router = Router();

const orm = await MikroORM.init(initORM);
const em = orm.em.fork();
const newCategoryController = new NewscategoryController(em);

/*const newCategoryController = new NewscategoryController();

router.get('/', newCategoryController.getAll);
router.get('/:id', newCategoryController.getById);
router.post('/',newCategoryController.create);
router.put('/:id', newCategoryController.update);
router.delete('/:id', newCategoryController.delete);

export default router;*/
