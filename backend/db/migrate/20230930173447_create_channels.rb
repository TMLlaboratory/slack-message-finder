class CreateChannels < ActiveRecord::Migration[6.1]
  def change
    create_table :channels do |t|

      t.text :channel
      t.text :name
      t.timestamps
    end
  end
end
