var url = require('url');

exports.subscription= function(req, res){
  var data = url.parse(req.url, true).query;
  console.log(req.body);
  res.send(data['hub.challenge']);
};