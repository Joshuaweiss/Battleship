class CreateGames < ActiveRecord::Migration[5.0]
  def change
    create_table :games do |t|
      t.integer :user_id, null: false
      t.boolean :over, default: false
      t.boolean :won
      t.text :board, null: false
      t.string :phase, null: false
    end
  end
end
