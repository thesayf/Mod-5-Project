class PostsController < ApplicationController
    def index 
        posts = Post.all
        render json: posts, include: [:user, :comments]
    end

    def create_new_post
        byebug
        post = Post.create(title: params[:title], content: params[:description], image: params[:img], user_id: params[:userID], latitude: params[:latitude], longitude: params[:longitude])
        render json: post
    end

    def find_by_current_location
        posts = Post.near([params[:latitude], params[:longitude]], 10)
        render json: posts, include: [:user, :comments]
    end

    def search_address
        address = Geocoder.search(params[:searchInput])
        render json: address.first.coordinates, include: [:user, :comments]
    end

end
