class PostSerializer < ActiveModel::Serializer
  attributes :created_at, :title, :content, :image, :id, :latitude, :longitude, :address, :user
  has_many :comments
  has_many :ratings

  def user
    UserSerializer.new(self.object.user)
  end

  # def comments
  # self.object.comments.map do |comment| 
  #     CommentSerializer.new(comment)
  # end 
  
  # end
  
end
