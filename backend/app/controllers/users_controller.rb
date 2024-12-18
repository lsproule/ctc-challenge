class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:update_current_user] 

  def get_current_user
      render json: current_user
  end

  def update_current_user 
    user_params = params.require(:user).permit(:email, :password)

    if user_params[:password].blank?
      user_params.delete(:password)
    end

    if current_user.update(user_params)
      render json: current_user
    else
      render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end

end
