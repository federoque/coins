import dotenv from 'dotenv';
import redis from './redis';
import metaverse from './metaverse';
import coins_cronjob from './coins-cronjob';
dotenv.config();

const { env } = process;

const config = {
    PORT: env.PORT,
    REDIS: redis,
    METAVERSE: metaverse,
    coins_cronjob
};

export default config;
