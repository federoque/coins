import { Server } from 'socket.io';

import coinsService from '../api/coins/coins.service';
import { Room, Coin } from './socket.dto';

export default function connectionSocket(io: Server) {
    io.on('connection', (socket) => {
        io.emit('server:user_connection', {
            message: `User id ${socket.id} is connected`
        });

        socket.on('disconnect', () => {
            coinsService.roomDesconection(socket.id).then(() => {
                io.emit('server:user_desconnection', {
                    message: `User id ${socket.id} is disconnected`
                });
            });
        });

        socket.emit('server:welcome_message', {
            message: 'Welcome to metaverse. Select a room between 1 and 8'
        });

        socket.on('client:room_connection', (metaverse_room: Room) => {
            if (
                !metaverse_room ||
                typeof metaverse_room.room !== 'number' ||
                isNaN(metaverse_room.room) ||
                metaverse_room.room < 1 ||
                metaverse_room.room > 8
            ) {
                socket.emit('server:warning', {
                    message: 'Please, send a valid number of room'
                });
            } else {
                coinsService
                    .getRoomCoins(String(metaverse_room.room), socket.id)
                    .then((data) => {
                        if (!data.data) {
                            socket.emit('server:warning', {
                                message: data.message
                            });
                        } else {
                            socket.emit('server:roomcoins', {
                                coins: data.data
                            });
                        }
                    });
            }
        });

        socket.on('client:catch_coin', (metaverse_coin: Coin) => {
            if (
                !metaverse_coin ||
                typeof metaverse_coin.coin !== 'number' ||
                isNaN(metaverse_coin.coin)
            ) {
                socket.emit('server:warning', {
                    message: 'Please, send a valid number of coin'
                });
            } else {
                coinsService
                    .coinCatching(socket.id, metaverse_coin.coin)
                    .then((data) => {
                        if (!data.data) {
                            socket.emit('server:warning', data.message);
                            if (data.coins) {
                                socket.emit('server:roomcoins', data.coins);
                            }
                        } else {
                            io.emit('server:coin_catched', {
                                messsage: `${data.message}- Coin information: Position X--> ${data.data.x} Position Y--> ${data.data.y} Position X--> ${data.data.z}`
                            });
                        }
                    });
            }
        });
    });
}
