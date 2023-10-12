import redis from './redis';
import metaverse from './metaverse';
import coins_cronjob from './coins-cronjob';
import websocket from './socket';

const config = {
    REDIS: redis,
    METAVERSE: metaverse,
    coins_cronjob,
    websocket
};

export default config;
