import { Router } from 'express';
import HealthRoutes from '../api/health/routes';
import CoinsRoutes from '../api/coins/routes';

const AppRouter = Router();

AppRouter.use('/health', HealthRoutes);
AppRouter.use('/coins', CoinsRoutes);

export default AppRouter;
