class CommentsController < ApplicationController

    def index 
        comments = Comment.all
        render json: comments, include: [:user, :post]
    end

    def create_new_comment
        comment = Comment.create(content: params[:commentInput], user_id: params[:userID], post_id: params[:postID])
        render json: comment
    end

end
