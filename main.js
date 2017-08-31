var http = require('http');
var url = require('url');

http.createServer(function(req, res) {
  //console.log(req);
  //var dateObj = new Date(req);
  var q = url.parse(req.url, true);
  var pathname = q.pathname;

  fs.readFile(pathname.substr(1), function(err, data) {
    if(err) throw err;

    res.writeHead(200, {'Content-Type': 'text/hmlt'});

    res.write(data.toString());

    res.end();
  })
}).listen(7777);
