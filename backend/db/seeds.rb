# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end



user = User.find_or_create_by(email: 'test@test.com') 
user.password = 'password' 
user.save!

user1 = User.find_or_create_by(email: 'test2@test.com') 
user1.password = 'password'  
user1.save!

room = Room.find_or_create_by(name: 'Default')  
room.save!

(1..10).each do |i| 
  Message.create!(content: "Message #{i}", user: user,  room: room)  
  Message.create!(content: "Message #{i}", user: user1, room: room)   
end


