const express = require('express'),
    http = require('http'),
    socketio = require('socket.io'),
    path = require('path'),
    cors = require('cors'),
    routes = require('./routes'),
    { connectDB } = require('./utils/db_handler'),
    expressValidator = require('express-validator'),
    dotenv = require('dotenv'),
    morgan = require('morgan');




const port = process.env.port || 4000;
const app = express();
const server = http.Server(app);
const socket = socketio(server);



app.use(express.static(path.join(__dirname, '/')));
app.use(
    express.json()
);
app.use(express.urlencoded({ extended: false }));
app.use(
    cors()
);
app.use(expressValidator());
// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
// Load config
dotenv.config({ path: './config/config.env' })


/* Including app Routes starts*/

routes.initRoutes(app);

//manage socket connection setup
socket.on('connection', (socket) => {
    socket.emit("connected", { connected: true });
    console.log(socket == socket);
})


/**inits a handler to connect to db */


connectDB();

/* Including app Routes ends*/

server.listen(port, () => {
    console.log(`Listening on port:${port}`);
});


