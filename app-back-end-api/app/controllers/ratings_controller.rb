class RatingsController < ApplicationController

    def index 
        ratings = Rating.all
        render json: ratings, include: [:user, :post]
    end

    def create_new_rating
        rating = Rating.create(user_id: params[:userID], post_id: params[:postID])
        render json: rating
    end

    def delete_new_rating
        rating = Rating.find_by(user_id: params[:userID], post_id: params[:postID])
        rating.destroy
        
    end


end
