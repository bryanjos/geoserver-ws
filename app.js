
/**
 * Module dependencies.
 */

var express = require('express'),
    app = express()
    , server = require('http').createServer(app)
    , path = require('path')
    , fs = require('fs')
    , io = require('socket.io').listen(server);


app.configure(function(){
    app.set('port', process.env.PORT || 9000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    //app.use(express.cookieParser('your secret here'));
    //app.use(express.session());
    app.use(app.router);
    //app.use(require('less-middleware')({ src: __dirname + '/public' }));
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/', function(req, res){
    res.render('index', { title: 'Express' });
});

app.post('/geoserver/inserted', function(req, res){
    io.sockets.emit('geoserver-inserted', req.body);
    res.send('OK');
});

app.post('/geoserver/updated', function(req, res){
    io.sockets.broadcast.emit('geoserver-updated', req.body);
    res.send('OK');
});

app.post('/geoserver/deleted', function(req, res){
    io.sockets.broadcast.emit('geoserver-deleted', req.body);
    res.send('OK');
});


server.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});