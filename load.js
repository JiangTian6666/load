var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");
http.createServer(function(req,res){
    staticRoot(path.join(__dirname,"static"),req,res);
}).listen(8888);
function staticRoot(staticaPath,req,res) {
  var pathObj = url.parse(req.url,true);
  var pathname = pathObj.pathname;
  var filePath = path.join(staticaPath,pathname)
  switch(pathname){
          case "/":
             pathname+="load.html";
             res.end(fs.readFileSync(filePath+req.url))
             break;
          case "/request":
             var index = pathObj.query.index;
             var len = pathObj.query.len;
             var arr = [];
             for (var i = 0; i < len; i++) {
               arr.push("新闻"+(parseInt(index)+i))
             }
            res.end(JSON.stringify(arr));
             break;
          default:
            fs.readFile(filePath,"binary",function(err,data){
      if (err) {
        res.writeHead(404,"not Found");
        res.write("<h1>404 Not Found</h1>");
      }else{
        res.writeHead(200,"ok");
          res.write(data,"binary")
          res.end();
      }
    });
}
};