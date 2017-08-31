var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function(req, res) {
  //console.log(req);
  //var dateObj = new Date(req);
  //var q = url.parse(req.url, true);
  //var pathname = q.pathname;
  var q = req.url;
  q = q.toString().replace('/', '');
  var newDate = new Date(decodeURI(q));
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(newDate.toString());
  console.log(typeof newDate);
  console.log(newDate);
  res.end();

}).listen(7777);
