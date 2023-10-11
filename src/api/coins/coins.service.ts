import config from '../../config';
import { Coin, Metaverse, Room } from './coins.interfaces';

const coinsService = {
    async createCoins() {
        const redis = await config.REDIS();
        const coins: Coin[] = [];
        const metaverse: Metaverse = (await config.METAVERSE()).metaverse;
        let id = 1;
        while (coins.length < 100) {
            //Random Creation of new Coin (into metaverse limits)
            const newCoin: Coin = {
                id: id,
                x: Math.trunc(Math.random() * metaverse.xmax),
                y: Math.trunc(Math.random() * metaverse.ymax),
                z: Math.trunc(Math.random() * metaverse.ymax),
                owner: null
            };
            //If a coin already exist in that position it will create another
            const findCoin = coins.find(
                (coin: Coin) =>
                    coin.x === newCoin.x &&
                    coin.y === newCoin.x &&
                    coin.z === newCoin.z
            );
            if (!findCoin) {
                coins.push(newCoin);
                id++;
            }
        }
        redis.set('coins', JSON.stringify(coins));
        return coins;
    },
    async getAllCoins() {
        const redis = await config.REDIS();
        const coins = await redis.get('coins');
        if (!coins || coins.length === 0) {
            throw new Error('Coins not generated yet');
        }
        return JSON.parse(coins);
    },
    async getRoomCoins(roomNumber: string) {
        const rooms: Room[] = (await config.METAVERSE()).rooms;
        const room = rooms[roomNumber];
        const redis = await config.REDIS();
        const coins = await redis.get('coins');
        if (!coins || coins.length === 0) {
            throw new Error('Coins not generated yet');
        }
        const parsedCoins: Coin[] = JSON.parse(coins);
        const filterCoins = parsedCoins.filter(
            (coin) =>
                coin.x >= room.xmin &&
                coin.y >= room.ymin &&
                coin.z >= room.zmin &&
                coin.x < room.xmax &&
                coin.y < room.ymax &&
                coin.z < room.zmax
        );
        return filterCoins;
    }
};

export default coinsService;
