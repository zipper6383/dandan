import { Router } from 'express';
import {
  getDashboardStats,
  getDonationTrends,
  getProjectStats,
  getVolunteerStats,
  getMonthlyReport,
} from '../controllers/statistics.controller';

const router = Router();

router.get('/dashboard', getDashboardStats);
router.get('/donation-trends', getDonationTrends);
router.get('/projects', getProjectStats);
router.get('/volunteers', getVolunteerStats);
router.get('/monthly-report', getMonthlyReport);

export default router;
