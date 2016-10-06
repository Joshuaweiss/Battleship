class GameSerializer < ActiveModel::Serializer

  attributes :player_board, :cpu_board, :phase, :won

  def player_board
    object.player_board.cells
  end

  def cpu_board
    object.cpu_board.censor_hidden_ships
  end

end
