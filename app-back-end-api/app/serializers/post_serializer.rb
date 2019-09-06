class PostSerializer < ActiveModel::Serializer
  attributes :created_at, :comments, :title, :content, :image, :id, :latitude, :longitude, :address,

  def user
    UserSerializer.new(self.object.user)
  end

  def comments
  self.object.comments.map do |comment| 
      CommentSerializer.new(comment)
  end 
  
  end
  
end
