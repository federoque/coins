import { Response } from 'express';

const healthController = {
    async health(req, res: Response) {
        try {
            res.send({
                success: true,
                message: 'Success!'
            });
        } catch (error) {
            res.status(400).send('Error');
        }
    }
};

export default healthController;
