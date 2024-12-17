class ApplicationController < ActionController::Base
  def after_sign_in_path_for(resource)
    # stored_location_for(resource) || welcome_path
    request.protocol + request.host_with_port + '/app'
  end
  def after_inactive_sign_up_path_for(resource)
    request.protocol + request.host_with_port + '/app'  
  end
end
