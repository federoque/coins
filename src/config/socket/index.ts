import { Server } from 'socket.io';
import http from 'http';

const websocket = (server: http.Server) => {
    return new Server(server);
};

export default websocket;
