class AuthCheckController < ApplicationController
  def check 
    response.status = 200
    render json: {message: "You are authenticated"}  
  end
end
