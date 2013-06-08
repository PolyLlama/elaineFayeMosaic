var url = require('url')
  , https = require('https')
  , fs = require('fs')
  , request = require('request')
  , mongoose = require('mongoose')
  , io = require('../app.js');

// set up db connection
//mongoose.connect('mongodb://polyllama:3181llamas!@dharma.mongohq.com:10013/elainemosaic');
//var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));

// image schemas
//var imageSchema = mongoose.Schema({

//});

var DOWNLOAD_DIRECTORY = './public/mosaic_images/standard_resolution/';
var REQUEST_DIRECTORY = '/mosaic_images/standard_resolution/'

var parseImageData = function(imageData){
  var imageSrc = imageData.images.standard_resolution.url
    , imageFileName = imageSrc.split('/').pop()
    , callback = function(){io.io.sockets.emit('message', REQUEST_DIRECTORY + imageFileName)};
  
  download(imageSrc, imageFileName, callback);
}

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    var imageStream = request(uri, callback).pipe(fs.createWriteStream(DOWNLOAD_DIRECTORY + filename));
  });
};

exports.subscription= function(req, res){
    var data = url.parse(req.url, true).query;
    res.send(data['hub.challenge']);
};

exports.notification = function(req, res){

	var url = 'https://api.instagram.com/v1/tags/polyllamalabs/media/recent?client_id=aaf56a682fb7499198afa91337213f63';
    var json = '';

	callback = function(response) {
		response.on('data', function(d) {
    		json += d;
  		});

        response.on('end', function(){
            
            var data = JSON.parse(json).data
              , length = data.length;
            
            console.log(length);
            parseImageData(data[0]);

            /*
            for(var i = 0; i < length; i++){
                var timestamp = Date();
                console.log(data[i].images.standard_resolution.url);
                parseImageData(data[i]);
                //download(data[i].images.low_resolution, '/mosaic_images/low_resolution/mosaic' + timestamp + '.jpg');
            }
            */
            res.json(json);
            //download(image, 'test.jpg');
            
        });
	}

	var request = https.get(url, callback);
	request.end();
    
}


