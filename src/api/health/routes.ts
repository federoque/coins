import express from 'express';
import healthController from './controller';

const routes = express.Router();

routes.get('/', healthController.health);

export default routes;
