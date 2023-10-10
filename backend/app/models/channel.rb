class Channel < ApplicationRecord
    has_many :messages, foreign_key: :channel_id
end
