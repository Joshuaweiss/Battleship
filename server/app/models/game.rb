class Game < ApplicationRecord

  belongs_to :user

  scope :not_over, -> { where(over: false) }

  serialize :board, Array

  validate :players_have_5_ships

  #phases
  GUESS = "GUESS"
  OVER = "OVER"

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
    game = Game.new(
      board: board_cells,
      phase: GUESS,
    )
    game.add_cpu_ships
    game
  end


  def add_cpu_ships
    cell_coordinates_where(ship: false).shuffle.first(5).each do |coordinate|
      set_cell_at_coordinate(coordinate, {ship: true, enemy: true, destroyed: false})
    end
  end

  def cell_coordinates_where(test)
    (0...5).to_a.repeated_permutation(2).select do |coordinate|
      cell = cell_at_coordinate(coordinate)
      cell.to_a.all? {|key, value| !test.has_key?(key) || test[key] == value}
    end
  end

  def cell_at_coordinate(coordinate)
    board[coordinate[1]][coordinate[0]].dup
  end

  def set_cell_at_coordinate(coordinate, cell)
    board[coordinate[1]][coordinate[0]] = cell
  end

  #front end has access to a censored board
  def player_board
    censored_board(
      cell_coordinates_where({ship: true, enemy: false}) +
      cell_coordinates_where({ship: true, enemy: true, destroyed: true})
    )
  end

  def censored_board(whitelist)
    board.map.with_index do |row, row_index|
      row.map.with_index do |cell, cell_index|
        whitelist.include?([cell_index, row_index]) ? cell : {}
      end
    end
  end

  def guess=(coordinate)
    player_guess(coordinate)
    check_if_game_is_over
    return if over?
    cpu_guess
    check_if_game_is_over
  end

  def player_guess(coordinate)
    cell = cell_at_coordinate(coordinate)
    return unless cell[:ship] && cell[:enemy]
    cell[:destroyed] = true
    set_cell_at_coordinate(coordinate, cell)
  end

  def cpu_guess
    coordinate = (cell_coordinates_where({ship: false}) + cell_coordinates_where({ship: true, enemy: false})).sample
    cell = cell_at_coordinate(coordinate)
    return unless cell[:ship] && !cell[:enemy]
    cell[:destroyed] = true 
    set_cell_at_coordinate(coordinate, cell)
  end

  def check_if_game_is_over
    [true, false].each do |is_enemy_destroyed|
      if cell_coordinates_where({ship: true, enemy: is_enemy_destroyed, destroyed: true}).length == 5
        self.over = true
        self.won = is_enemy_destroyed
        self.phase = OVER
      end
    end
  end

  def players_have_5_ships
    {player: false, cpu: true}.each do |player, enemy|
      errors.add(:cells, "#{player} does not have 5 ships") unless cell_coordinates_where(ship: true, enemy: enemy).count == 5
    end
  end

end
