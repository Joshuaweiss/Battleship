class GameSerializer < ActiveModel::Serializer

  attributes :player_board, :phase, :won

end
