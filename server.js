var http = require('http');

http.createServer(function(req,resp) {
	resp.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
	resp.write("Hallå elle! Testar lite");
	resp.end();
}).listen(8080);
