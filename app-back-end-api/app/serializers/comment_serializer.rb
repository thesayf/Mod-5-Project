class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :user_info
  has_one :user

  def user_info
    {
      name: object.user.name,
      image: object.user.image,
    }
  end
end
