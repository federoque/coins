import { createClient } from 'redis';

const connect = async () => {
    const client = createClient();
    client.on('error', (error) => console.log('Redis client error ', error));
    await client.connect();
    return client;
};

export default connect;
