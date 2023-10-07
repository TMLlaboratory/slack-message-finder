class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|

      t.text :user
      t.text :ts
      t.text :thread_ts
      t.text :text
      t.text :image_name
      t.text :image_url
      t.text :url
      t.text :channel
      t.timestamps
    end
  end
end
