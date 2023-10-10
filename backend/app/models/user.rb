class User < ApplicationRecord
    has_many :messages, foreign_key: :user_id
end
