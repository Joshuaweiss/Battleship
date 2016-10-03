Rails.application.routes.draw do
  devise_for :users

  root to: "main#show"

  resource :game, only: [:show, :create, :update]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
