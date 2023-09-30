class CreateReplies < ActiveRecord::Migration[6.1]
  def change
    create_table :replies do |t|

      t.references :message
      t.references :user
      t.text :ts
      t.timestamps
    end
  end
end
