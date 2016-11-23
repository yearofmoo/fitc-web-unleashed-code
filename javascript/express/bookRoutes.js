module.exports = function(db) {
  return {
    index : function(req, res) {
      var rows = [];
      db.each("SELECT * FROM books", function(err, row) {
        rows.push(row);
      }, function() {
        res.json(rows);
      });
    },

    show : function(req, res) {
      res.json(req.book);
    },

    update : function(req, res) {
      var data = req.body;
      var title = data.title;
      var description = data.description;
      var isbn = data.isbn;
      
      db.run("INSERT INTO books WHERE (title, description, isbn) VALUES " +
        "('" + title + "','" + description + "', '" + isbn + "')", function() {
        res.json({ ok : true });
      });
    },

    create : function(req, res) {
      var data = req.body ? req.body.book : null;
      if(!data) {
        res.status(400);
        return;
      }
      
      var title = data.title;
      var description = data.description;
      var isbn = data.isbn;
      
      db.run("INSERT INTO books (title, description, isbn) VALUES " +
        "('" + title + "','" + description + "', '" + isbn + "')", function(err) {
        res.json({ ok : true });
      });
    },

    destroy : function(req, res) {
      db.run("DELETE FROM books WHERE id=" + id, function(err, row) {
        res.json({ ok : true });
      });
    },

    findBook : function(req, res, next, id) {
      var book;
      db.each("SELECT * FROM books WHERE id=" + id, function(err, row) {
        book = row;
      }, function() {
        req.book = book;
        next();
      });
    }
  }
};
