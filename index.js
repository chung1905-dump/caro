var fs = require('fs');

var server = require('http').createServer(function (request, response) {
    fs.readFile('game.html', function (err, data) {
        // console.log(err);
        response.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': data.length});
        response.write(data);
        // console.log(data);
        response.end();
    });
});

var onlineNow = 0;

var io = require('socket.io')(server);

io.sockets.on('connection', function (client) {

    io.emit('online', ++onlineNow);
    console.log(onlineNow + ' online');

    var address = client.handshake.address;
    // console.log(address);
    console.log('New connection from ' + address);

    client.on('minhdi', function (data) {
        console.log(data);
        data.v = (data.v == 0) ? 1 : 0;
        io.emit('doiphuongdi', data);
    });

    client.on('send', function (data) {
        console.log(data);
        io.emit('nhan', data);
    });

    client.on('disconnect', function () {
        console.log(--onlineNow + ' online');
    });

});
server.listen(9000);