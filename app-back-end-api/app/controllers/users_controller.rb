class UsersController < ApplicationController

    def index 
        users = User.all
        render json: users
    end 
    
    def create
        user = User.create(name: params[:name], email: params[:email], password: params[:password], image: params[:image])
        if user.valid?
            render json: { user: UserSerializer.new(user), token: issue_token({user_id: user.id}) }, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :not_accepted
        end
    end
end
