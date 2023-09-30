class Message < ApplicationRecord

    belongs_to :user

    has_many :replies
    has_many :elements
    has_many :images

end
