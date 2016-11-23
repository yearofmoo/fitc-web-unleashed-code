var CURRENT_API = 'rails';

var proxy = require('express-http-proxy');
var express = require('express');
var app = express();

var apps = {
  rails : 3000,
  sinatra : 4567,
  express : 4000
};

app.use('/', express.static('./angular'));
app.use('/api', proxy('localhost:' + apps[CURRENT_API], {
  forwardPath: function(req, res) {
    return '/api' + require('url').parse(req.url).path;
  }
}));

app.listen(8888);
