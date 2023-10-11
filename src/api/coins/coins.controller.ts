import { Request, Response } from 'express';
import coinsService from './coins.service';

const coinsController = {
    async createCoins(req: Request, res: Response) {
        try {
            const coins = await coinsService.createCoins();
            res.send({
                success: true,
                data: coins
            });
        } catch (error) {
            res.status(400).send('Error');
        }
    },
    async getAllCoins(req: Request, res: Response) {
        try {
            const coins = await coinsService.getAllCoins();
            res.send({
                success: true,
                data: coins
            });
        } catch (error) {
            res.status(400).send('Error');
        }
    },
    async getRoomCoins(req: Request<{ room: number }>, res: Response) {
        try {
            const { room } = req.params;
            const parsedRoom = Number(room);

            if (isNaN(parsedRoom) || room < 1 || room > 8) {
                throw new Error('Wrong room number');
            }
            const coins = await coinsService.getRoomCoins(String(room));
            res.send({
                success: true,
                data: coins
            });
        } catch (error) {
            res.status(400).send({
                error: (error as Error).message
            });
        }
    }
};

export default coinsController;
