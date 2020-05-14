const express = require('express'),
    http = require('http'),
    socketio = require('socket.io'),
    bodyParser = require('body-parser'),
    path = require('path'),
    cors = require('cors'),
    routes = require('./routes'),
    dbHandler = require('./utils/DBHandler'),
    User = require('./models/User');
    const expressValidator = require('express-validator');


class Server {

    constructor() {
        this.port = process.env.port || 4000;
        this.app = express();
        this.server = http.Server(this.app);
        this.socket = socketio(this.server);
        this.host = 'localhost';
    }

    appConfig() {
        this.app.use(express.static(path.join(__dirname, '/')));
        this.app.use(
            bodyParser.json()
        );
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(
            cors()
        );
        this.app.use(expressValidator());
        // new config(this.app);
    }

    /* Including app Routes starts*/
    includeRoutes() {
        routes.initRoutes(this.app);

        //manage socket connection setup
        this.socket.on('connection', (socket) => {
            socket.emit("connected", { connected: true });
            console.log(socket == this.socket);
        })
    }

    /**inits a handler to connect to db */
    initDbHandler() {

        dbHandler.connectToDB();

    }

    /* Including app Routes ends*/
    execute() {
        this.appConfig();
        this.includeRoutes();
        this.initDbHandler();
        this.server.listen(this.port, () => {
            console.log(`Listening on http://${this.host}:${this.port}`);
        });
    }
}

const server = new Server();
server.execute();