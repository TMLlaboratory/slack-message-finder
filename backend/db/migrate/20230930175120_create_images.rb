class CreateImages < ActiveRecord::Migration[6.1]
  def change
    create_table :images do |t|

      t.references :message
      t.text :name
      t.text :url
      t.timestamps
    end
  end
end
