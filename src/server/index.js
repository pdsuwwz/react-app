var express = require('express');
var path = require('path');
var config = require('../common/config');

var app = express();
// app.set('views', __dirname + '');
// app.use(express.static(__dirname + ''));
// app.set('view engine', 'html');
// app.engine('html', ejs.renderFile);


// 启动服务器
// app.get('*', function (req, res) {
//   res.render('index.html', {});
// });

app.use(express.static(__dirname + '/../../public'));
app.use(function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../../public/index.html'));
});

app.listen(config.port);
console.log("react app starting on port: %d", config.port);
