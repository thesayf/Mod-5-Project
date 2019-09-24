class RatingSerializer < ActiveModel::Serializer
  attributes :id, :user_info, :post_info, :user_id, :post_id
  has_one :user
  has_one :post

  def user_info
    {
      name: object.user.name,
      image: object.user.image,
      id: object.user.id,
    }
  end

  def post_info
    {
      id: object.post.id,
    }
  end


end

