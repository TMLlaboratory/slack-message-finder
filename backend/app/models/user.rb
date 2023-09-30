class User < ApplicationRecord

    has_many :channels
    has_many :members
    has_many :messages
    has_many :replies
    
end
