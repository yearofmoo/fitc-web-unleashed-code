var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require("sqlite3").verbose();
var fs = require("fs");

fs.unlink("db.sqlite3");

var db = new sqlite3.Database("db.sqlite3");
db.serialize(function() {
  db.run(
    "CREATE TABLE books ( id INTEGER PRIMARY KEY AUTOINCREMENT, title varchar(30), isbn varchar(20), description text);"
  );
});

var app = express();
app.use(bodyParser());

var bookRoutes = require('./bookRoutes')(db);

app.get('/api/books', bookRoutes.index);
app.post('/api/books', bookRoutes.create);
app.get('/api/books/:book_id', bookRoutes.show);
app.put('/api/books/:book_id', bookRoutes.update);
app.delete('/api/books/:book_id', bookRoutes.destroy);

app.param('book_id', bookRoutes.findBook);

app.listen(4000);
