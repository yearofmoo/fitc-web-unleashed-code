require 'sinatra'
require 'json/ext'
require 'sqlite3'

$db = SQLite3::Database.new "db.sqlite3"

# Create a database
begin
  $db.execute <<-SQL
    create table books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title varchar(30),
      isbn varchar(20),
      description text
    );
  SQL
  rescue;
end

get '/api/books' do
  content_type :json
  rows = []
  $db.execute( "select * from books" ) do |row|
    rows.push(row)
  end
  rows.to_json
end

get '/api/books/:id' do
  id = params[:id]
  
  content_type :json
  book = nil
  $db.execute( "select * from books where id = ?" [id]) do |row|
    rows.push(row)
  end
  book.to_json
end

post '/api/books' do
  book = params[:book] || {}

  content_type :json
  status = $db.execute("insert into books (title, description, isbn) values ( ?, ?, ?)",
    [book[:title].to_s, book[:description].to_s, book[:isbn]])

  { success: status }.to_json
end

delete '/api/books/:id' do
  content_type :json
  id = params[:id]
  status = $db.execute("delete from books where id = ?", [id])
  { success: status }.to_json
end

put '/api/books/:id' do
  content_type :json
  id = params[:id]
  status = $db.execute("update books SET title = ?, description = ?, isbn = ? WHERE id = ?",
    [book[:title].to_s, book[:description].to_s, book[:isbn], id])
  { success: status }.to_json
end
