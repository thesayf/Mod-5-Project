Rails.application.routes.draw do
  resources :ratings
  resources :comments
  post "/posts", to: 'posts#find_by_current_location'
  post "/search", to: 'posts#search_address'
  post "/newpost", to: 'posts#create_new_post'
  post "/login", to: 'auth#create'
  post "newcomment", to: 'comments#create_new_comment'
  get "/validate", to: 'auth#validate_token'
  post "/newrating", to: 'ratings#create_new_rating'
  post "/deleterating", to: 'ratings#delete_new_rating'
  resources :posts
  resources :users
end
