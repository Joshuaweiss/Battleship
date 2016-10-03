class Game < ApplicationRecord

  belongs_to :user

  scope :not_over, -> { where(over: false) }

  serialize :board, Array

  validate :players_have_5_ships

  #phases
  GUESS = "GUESS"

  DEFAULT_CELL = {
    ship: false,
    enemy: false,
    destroyed: false,
  }

  def self.from_board(board_cells) 
    #clean input
    board_cells.map! do |board_row| 
      board_row.map! do |board_cell|
        #keys to symbols
        board_cell = board_cell.to_h.to_a.map! {|key, value| [key.to_sym, value]}.to_h
        #clean empy values
        DEFAULT_CELL.merge(board_cell)
      end
    end
    board = Game.new(
      board: board_cells,
      phase: GUESS,
    )
    board.add_cpu_ships
    board
  end


  def add_cpu_ships
    unused_cell_coordinates.shuffle.first(5).each do |coordinate|
      set_cell_at_coordinate(coordinate, {ship: true, enemy: true, destroyed: false})
    end
  end

  def unused_cell_coordinates
    cell_coordinates_where {|cell| !cell[:ship] }
  end

  def players_cell_coordinates
    cell_coordinates_where {|cell| cell[:ship] && !cell[:enemy] }
  end

  def cpu_cell_coordinates
    cell_coordinates_where {|cell| cell[:ship] && cell[:enemy] }
  end

  def ship_cell_coordinates
    cell_coordinates_where {|cell| cell[:ship] }
  end

  def cell_coordinates_where(&block)
    (0...5).to_a.repeated_permutation(2).select {|coordinate| block.call(cell_at_coordinate(coordinate))}
  end

  def cell_at_coordinate(coordinate)
    board[coordinate[0]][coordinate[1]]
  end

  def set_cell_at_coordinate(coordinate, cell)
    board[coordinate[0]][coordinate[1]] = cell
  end

  def players_have_5_ships
    {player: players_cell_coordinates, cpu: cpu_cell_coordinates}.each do |player, player_cells|
      errors.add(:cells, "#{player} does not have 5 ships") unless player_cells.count == 5
    end
  end

end
