class Post < ApplicationRecord
  belongs_to :user
  has_many :comments
  has_many :ratings
  reverse_geocoded_by :latitude, :longitude
  after_validation :reverse_geocode
end
