Rails.application.routes.draw do
  resources :comments
  post "/posts", to: 'posts#find_by_current_location'
  post "/search", to: 'posts#search_address'
  post "/newpost", to: 'posts#create_new_post'
  post "/login", to: 'auth#create'
  post "newcomment", to: 'comments#create_new_comment'
  get "/validate", to: 'auth#validate_token'
  resources :posts
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
