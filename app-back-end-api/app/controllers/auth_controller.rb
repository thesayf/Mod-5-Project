class AuthController < ApplicationController
    def create
        user = User.find_by(email: params[:email])
        if user && user.authenticate(params[:password])
            render json: { user: UserSerializer.new(user), token: issue_token(user_id: user.id) }, status: :accepted
        else
            render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
    end

    def validate_token
        user = User.decode_token(get_token)
        if user
            render json: { user: UserSerializer.new(user), token: issue_token(user_id: user.id) }, status: :accepted
        else
            render json: { error: 'User not found' }, status: :not_found
        end
    end

    private

end