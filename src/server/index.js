var express = require('express');
var path = require('path');
var config = require('../common/config');
var app = express();

app.use(express.static(__dirname + '/../../public'));
app.use(express.static(__dirname + '/../../vendor'));
app.use(function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../../public/index.html'));
});

app.listen(config.port);
console.log("React App starting on port: %d", config.port);
