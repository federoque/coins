import express from 'express';
import coinsController from './coins.controller';

const CoinsRoutes = express.Router();

// CoinsRoutes.post('/', coinsController.createCoins);
CoinsRoutes.get('/', coinsController.getAllCoins);
CoinsRoutes.get('/room/:room', coinsController.getRoomCoins);
CoinsRoutes.get('/users/:room', coinsController.getRoomUsers);

export default CoinsRoutes;
