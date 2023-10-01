class CreateElements < ActiveRecord::Migration[6.1]
  def change
    create_table :elements do |t|

      t.references :message
      t.text :element_type
      t.text :text
      t.text :url
      t.timestamps
    end
  end
end
