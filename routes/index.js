let signup = require('./signup');
function initRoutes(app) {

    app.get('/', function (req, res) {
        res.writeHead(200);
        res.end("Cheers Connected !!")
    });

    app.use('/user/', signup);

}

module.exports = { initRoutes };