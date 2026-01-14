import { Router } from 'express';
import * as CategoryController from '../controllers/category.controller';
import { requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/', CategoryController.getCategories);
router.get('/:id', CategoryController.getCategoryById);
router.post('/', requireAdmin, CategoryController.createCategory);
router.put('/:id', requireAdmin, CategoryController.updateCategory);
router.delete('/:id', requireAdmin, CategoryController.deleteCategory);

export default router;
