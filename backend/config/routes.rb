Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  
  devise_for :users, controllers: {
     sessions: 'users/sessions',
     registrations: 'users/registrations' 
  }

  authenticate :user do
    resources :rooms
    resources :messages
    
    mount ActionCable.server => '/cable'
    mount Motor::Admin => '/motor_admin'
    
    get '/check_auth', to: 'auth_check#check'
  end

  get '/' => redirect('/app')


  get 'up' => 'rails/health#show', as: :rails_health_check
end
