import express from 'express';
import AppRouter from './routes';
import config from './config';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE'
    );
    next();
});
app.use((req, _res, next) => {
    req.setTimeout(10000);
    next();
});

app.use('/api', AppRouter);

app.listen(`${config.PORT}`, () => {
    console.log(`Server is running on port ${config.PORT}`);
    // config.coins_cronjob();
});
