
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , url = require('url')
  , path = require('path');
  

var app = express();

//db connection string
process.env.MONGOHQ_URL = "mongodb://polyllama:3181llamas!@dharma.mongohq.com:10013/elainemosaic";

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var images = require('./routes/images');
//routes
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/image_subscription', images.subscription);
app.post('/image_subscription', images.notification);

var io = require('socket.io').listen(app.listen(app.get('port')));

exports.io = io;