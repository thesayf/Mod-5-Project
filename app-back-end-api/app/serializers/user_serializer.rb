class UserSerializer < ActiveModel::Serializer
  attributes :created_at, :name, :email, :id, :image
end
