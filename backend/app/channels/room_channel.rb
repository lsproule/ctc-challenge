class RoomChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "room"
  end

  #def after_subscribe(*methods, &block)
  #  set_callback(:subscribe, :after, *methods, &block)
  #end


  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    logger.debug "data: #{data.inspect}"
    if not data['message'] or not data['user_id']
      puts "No message" 
      return 
    end
    m = Message.create!(content: data['message'], user_id: data['user_id'], room_id: 1)
    m.created_at = Time.now 
    m.updated_at = Time.now
    m.save!

    ActionCable.server.broadcast("room", m.to_json(include: :user)) 
  end
end
