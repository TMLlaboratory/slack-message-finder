class AddColumnToChannel < ActiveRecord::Migration[6.1]
  def change
    add_column :channels, :creator, :integer
    add_column :channels, :is_private, :boolean
    add_column :channels, :num_members, :integer
  end
end
