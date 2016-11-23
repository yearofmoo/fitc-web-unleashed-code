angular.module("BookApp", [])

  .constant('API', 'https://booksapi.firebaseio.com/')

  .constant('BOOK_IMAGE', 'http://covers.openlibrary.org/b/isbn/ISBN-L.jpg')

  .controller('BooksCtrl', ['$http', '$rootScope', 'BOOK_IMAGE', 'API',
                    function($http,   $rootScope,   BOOK_IMAGE,   API) {
    var self = this;

    $rootScope.$on('reloadBooks', loadBooks);
    loadBooks();
    
    function loadBooks() {
      $http.get(API + '/books.json').success(function(books) {
        self.entries = _.map(books, function(book) {
          book.image = BOOK_IMAGE.replace('ISBN', book.isbn);
          return book;
        });
      });
    }
  }])

  .controller('BooksForm', ['$http', 'API', '$rootScope', function($http, API, $rootScope) {
    var self = this;
    self.submit = function(book) {
      $http.post(API + '/books.json', book).success(function(books) {
        $rootScope.$broadcast('reloadBooks');
      });
    };
  }])
