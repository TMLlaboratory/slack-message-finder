class Message < ApplicationRecord

    belongs_to :user
    belongs_to :channel

    has_many :replies
    has_many :elements
    has_many :images

end
