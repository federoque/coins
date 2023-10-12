import express from 'express';
import AppRouter from './routes';
import config from './config';
import cors from 'cors';
import http from 'http';
import sockets from './sockets';

const app = express();
const server = http.createServer(app);
const io = config.websocket(server);
sockets(io);
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

server.listen(3000, () => {
    console.log(`Server is running on port 3000`);
    config.coins_cronjob();
});
