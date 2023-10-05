Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :channels, only: [:index]
      resources :elements, only: [:index]
      resources :images, only: [:index]
      resources :members, only: [:index]
      resources :messages, only: [:index]
      resources :replies, only: [:index]
      resources :users, only: [:index]
    end
  end
end
