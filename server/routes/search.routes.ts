import { Router } from 'express';
import { searchAll, searchSuggestions } from '../controllers/search.controller';

const router = Router();

router.get('/', searchAll);
router.get('/suggestions', searchSuggestions);

export default router;
