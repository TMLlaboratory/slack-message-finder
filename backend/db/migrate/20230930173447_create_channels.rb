class CreateChannels < ActiveRecord::Migration[6.1]
  def change
    create_table :channels do |t|

      t.text :channel_id,
      t.text :name,
      t.references :user,
      t.timestamps
    end
  end
end
