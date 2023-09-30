class CreateMembers < ActiveRecord::Migration[6.1]
  def change
    create_table :members do |t|

      t.references :channel,
      t.references :user,
      t.timestamps
    end
  end
end
