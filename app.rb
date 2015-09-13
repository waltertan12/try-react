require 'sinatra'
require './model/comment'
require 'json'

ActiveRecord::Base.establish_connection(
  adapter:  'sqlite3',
  database: 'db/development.db'
)

get '/' do
  erb :index
end

get '/comments' do
  Comment.all.to_json
end

post '/comments' do
  comment = Comment.create(author: params["author"], body: params["body"])
  Comment.all.to_json if comment.save
end