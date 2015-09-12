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