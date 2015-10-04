require 'active_record'

class Note < ActiveRecord::Base
  validates :content, presence: true
end