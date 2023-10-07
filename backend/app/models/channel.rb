class Channel < ApplicationRecord

    has_many :members
    has_many :messages

end
