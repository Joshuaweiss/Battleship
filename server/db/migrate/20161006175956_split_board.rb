class SplitBoard < ActiveRecord::Migration[5.0]
  def change
    remove_column :games, :board
    add_column :games, :player_board, :text, null: false, default: ""
    add_column :games, :cpu_board, :text, null: false, default: ""
  end
end
