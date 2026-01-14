import { Router } from 'express';
import {
  getAboutContent,
  getAboutContentById,
  createAboutContent,
  updateAboutContent,
  deleteAboutContent,
} from '../controllers/about.controller';

const router = Router();

router.get('/', getAboutContent);
router.get('/:id', getAboutContentById);
router.post('/', createAboutContent);
router.put('/:id', updateAboutContent);
router.delete('/:id', deleteAboutContent);

export default router;
