var url = require('url');

exports.subscription= function(req, res){
  var data = url.parse(req.url, true).query;

  res.send(data['hub.challenge']);
};