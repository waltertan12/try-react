require 'sinatra'
require './model/comment'
require './model/note'
require 'json'
require 'pry'

ActiveRecord::Base.establish_connection(
  adapter:  'sqlite3',
  database: 'db/development.db'
)

get '/' do
  erb :index
end

get '/react-comments' do
  erb :comments
end

get '/react-notes' do 
  erb :notes
end

get '/notes' do
  Note.all.to_json
end

get '/notes/:id' do
  note = Note.find(params[:id])
  note.to_json if note
end

delete '/notes' do
  p params
  note = Note.find(params[:id])
  Note.all.to_json if note.destroy
end

post '/notes' do
  p params
  note = Note.new(content: params["content"])
  Note.all.to_json if note.save
end

get '/comments' do
  Comment.all.to_json
end

post '/comments' do
  comment = Comment.new(author: params["author"], body: params["body"])
  Comment.all.to_json if comment.save
end

if __FILE__ == $PROGRAM_NAME
  pry
end