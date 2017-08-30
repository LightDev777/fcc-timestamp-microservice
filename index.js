var http = require('http');
var url = require('url');

http.createServer(function(req, res) {
  //console.log(req);
  //var dateObj = new Date(req);
  var q = url.parse(req.url, true);
  var q1 = q.search;
  res.end(q1);
}).listen(7777);
