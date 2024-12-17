class RoomChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "room"
  end

  def after_subscribe(*methods, &block)
    set_callback(:subscribe, :after, *methods, &block)
  end


  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def messages(data)
    if not data['message'] 
      puts "No message" 
      return 
    end
    Message.create! content: data['message'], user_id: data['user_id'], room_id: data['room_id'] 
    ActionCable.server.broadcast("RoomChannel", message: data['message'])
  end
end
