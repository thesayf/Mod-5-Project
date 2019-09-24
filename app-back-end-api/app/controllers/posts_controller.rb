class PostsController < ApplicationController
    def index 
        posts = Post.all
        render json: posts, include: [:user, :comments, :ratings]
    end

    def create_new_post
        imageURL = Cloudinary::Uploader.upload(params[:image], { api_key: "737968659967114", api_secret: "qpIy_ZDhLXISl7ror23rwIGVMzI", cloud_name: "dfqall5sk"})
        post = Post.create(title: params[:title], content: params[:description], image: imageURL["url"], user_id: params[:userID], latitude: params[:latitude], longitude: params[:longitude])
        render json: post
    end

    def find_by_current_location
        posts = Post.near([params[:latitude], params[:longitude]], 10)
        render json: posts, include: [:user, :comments, :ratings]
    end

    def search_address
        address = Geocoder.search(params[:searchInput])
        if (address.length > 0)
            render json: address.first.coordinates, include: [:user, :comments]
        else
            render json: { error: "Could not find that address" }
        end
    end

end
