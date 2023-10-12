import config from '../../config';
import { Coin, Metaverse, Room, UserRoom } from './coins.interfaces';
const Keys = {
    coins: 'coins',
    usersRooms: 'usersRooms'
};
const coinsService = {
    async createCoins() {
        const redis = await config.REDIS();
        const coins: Coin[] = [];
        const metaverse: Metaverse = (await config.METAVERSE()).metaverse;
        const coinsQuantity: number = (await config.METAVERSE()).coins.quantity;
        let id = 1;
        while (coins.length < coinsQuantity) {
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
        await redis.set(Keys.coins, JSON.stringify(coins));
        return coins;
    },
    async roomCreation() {
        const redis = await config.REDIS();
        return await redis.del(Keys.usersRooms);
    },
    async getAllCoins() {
        const redis = await config.REDIS();
        const coins = await redis.get(Keys.coins);
        if (!coins || coins.length === 0) {
            throw new Error('Coins not generated yet');
        }
        return JSON.parse(coins);
    },
    async getRoomCoins(roomNumber: string, idUser?: string) {
        const rooms: Room[] = (await config.METAVERSE()).rooms;
        const room = rooms[roomNumber];
        const redis = await config.REDIS();
        if (idUser) {
            const userRoom: UserRoom = {
                idRoom: roomNumber,
                idUser: idUser
            };
            const usersRooms: UserRoom[] = JSON.parse(
                await redis.get(Keys.usersRooms)
            );
            if (!usersRooms) {
                await redis.set(Keys.usersRooms, JSON.stringify([userRoom]));
            } else {
                await redis.set(
                    Keys.usersRooms,
                    JSON.stringify([...usersRooms, userRoom])
                );
            }
        }
        const coins = await redis.get(Keys.coins);
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
                coin.z < room.zmax &&
                coin.owner === null
        );
        return filterCoins.map((coin) => {
            return {
                id: coin.id,
                x: coin.x,
                y: coin.y,
                z: coin.z
            };
        });
    },

    async coinCatching(idUser: string, idCoin: number) {
        const redis = await config.REDIS();
        const usersRooms: UserRoom[] = JSON.parse(
            await redis.get(Keys.usersRooms)
        );
        if (!usersRooms) {
            return {
                data: null,
                message: 'You must get into a room'
            };
        }
        const room = usersRooms.find((room) => room.idUser === idUser);
        if (!room)
            return {
                data: null,
                message: 'User does not belong any room'
            };
        const coins = await this.getRoomCoins(room.idRoom);
        const catchCoin = coins.find((coin) => coin.id === idCoin);
        if (!catchCoin)
            return {
                data: null,
                coins: coins,
                message:
                    'Coin does not exist or you can not catch that. Please, try with antoher'
            };
        const allCoins: Coin[] = await this.getAllCoins();
        const indexCoin = allCoins.findIndex((coin) => coin.id === idCoin);
        allCoins[indexCoin].owner = idUser;
        await redis.set(Keys.coins, JSON.stringify(allCoins));
        return {
            data: catchCoin,
            message: `User id ${idUser} catched a coin successfully`
        };
    },
    async getRoomUsers(roomNumber: string) {
        const redis = await config.REDIS();
        const usersRooms: UserRoom[] = JSON.parse(
            await redis.get(Keys.usersRooms)
        );
        if (!usersRooms || usersRooms.length === 0) {
            throw new Error('Nobody into a Room');
        } else {
            const users = usersRooms
                .filter((userRoom) => userRoom.idRoom === roomNumber)
                .map((user) => user.idUser);
            return {
                idRoom: Number(roomNumber),
                quantityUsers: users.length,
                users
            };
        }
    },
    async roomDesconection(idUser: string) {
        const redis = await config.REDIS();
        const usersRooms: UserRoom[] = JSON.parse(
            await redis.get(Keys.usersRooms)
        );
        if (!usersRooms || usersRooms.length === 0) {
            throw new Error('Nobody into a Room');
        } else {
            const newUsersRooms = usersRooms.filter(
                (user) => user.idUser !== idUser
            );
            await redis.set(Keys.usersRooms, JSON.stringify(newUsersRooms));
        }
    }
};

export default coinsService;
