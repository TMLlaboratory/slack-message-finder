Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :channels, only: [:index]
      resources :members, only: [:index]
      resources :messages, only: [:index] do
        collection do
          get ':channel', to: 'messages#index'
        end
      end
      resources :users, only: [:index]
    end
  end
end
